const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking.model");
const { Transaction } = require("../models/extras.model");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// Initialize eSewa
const esewaConfig = {
  merchantCode: process.env.ESEWA_MERCHANT_CODE || "EPAYTEST",
  secret: process.env.ESEWA_SECRET_KEY || "",
  successUrl:
    process.env.ESEWA_SUCCESS_URL || "http://localhost:3000/payment-success",
  failureUrl:
    process.env.ESEWA_FAILURE_URL || "http://localhost:3000/payment-failure",
  environment: process.env.ESEWA_ENV || "test",
};

// ─── Helper: Generate eSewa Signature ──────────────────────────────────────────
const generateESewaSignature = (
  totalAmount,
  transactionUuid,
  productCode,
  secret,
) => {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("base64");
  return signature;
};

// ─── POST /api/payments/create-intent ────────────────────────────────────────
// Creates a Stripe PaymentIntent for a booking
exports.createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate("room", "title");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    if (booking.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // NOTE: booking.grandTotal is now in NRS, but this charges Stripe in USD cents.
    // Stripe is not configured with real keys in this project - eSewa (below) is the
    // real Nepal payment path. Fix this currency mismatch before ever enabling Stripe.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.grandTotal * 100), // Stripe uses cents
      currency: "usd",
      metadata: {
        bookingId: booking._id.toString(),
        userId: req.user.id,
        roomTitle: booking.room?.title || "",
      },
    });

    // Save intent ID on booking
    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount: booking.grandTotal,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/payments/confirm ───────────────────────────────────────────────
// Called after successful frontend Stripe payment
exports.confirmPayment = async (req, res) => {
  try {
    const { bookingId, paymentIntentId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    booking.paymentStatus = "paid";
    booking.status = "confirmed";
    booking.paymentIntentId = paymentIntentId;
    await booking.save();

    // Attributed to the host, not the paying guest — this is the ledger the
    // host revenue dashboard and admin totals read from (see host.controller.js).
    await Transaction.create({
      user: booking.host,
      booking: booking._id,
      amount: booking.grandTotal,
      type: "charge",
      status: "completed",
      stripePaymentIntentId: paymentIntentId,
      description: `Payment for booking #${booking._id}`,
    });

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/payments/webhook ───────────────────────────────────────────────
// Stripe webhook (raw body required — configure in server.js if needed)
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const booking = await Booking.findOne({ paymentIntentId: intent.id });
    if (booking) {
      booking.paymentStatus = "paid";
      booking.status = "confirmed";
      await booking.save();
    }
  }

  res.json({ received: true });
};

// ─── GET /api/payments/transactions ──────────────────────────────────────────
exports.getMyTransactions = async (req, res) => {
  try {
    const { Transaction } = require("../models/extras.model");
    const transactions = await Transaction.find({ user: req.user.id })
      .populate("booking", "checkIn checkOut grandTotal")
      .sort({ createdAt: -1 });
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/payments/esewa/initiate ────────────────────────────────────────
// Initiate eSewa payment with proper signature
exports.initiateESewaPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate("room", "title");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    if (booking.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // eSewa payment parameters
    const amount = Math.floor(booking.grandTotal);
    const taxAmount = 0;
    const productServiceCharge = 0;
    const productDeliveryCharge = 0;
    const totalAmount =
      amount + taxAmount + productServiceCharge + productDeliveryCharge;
    const transactionUuid = uuidv4();
    const productCode = esewaConfig.merchantCode;

    // Generate signature using HMAC-SHA256
    const signature = generateESewaSignature(
      totalAmount,
      transactionUuid,
      productCode,
      esewaConfig.secret,
    );

    const esewaPayload = {
      amount: amount.toString(),
      tax_amount: taxAmount.toString(),
      total_amount: totalAmount.toString(),
      transaction_uuid: transactionUuid,
      product_code: productCode,
      product_service_charge: productServiceCharge.toString(),
      product_delivery_charge: productDeliveryCharge.toString(),
      success_url: esewaConfig.successUrl,
      failure_url: esewaConfig.failureUrl,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signature,
    };

    // Save booking reference
    booking.esewaTransactionId = transactionUuid;
    booking.paymentMethod = "esewa";
    await booking.save();

    res.json({
      success: true,
      payload: esewaPayload,
      esewaUrl:
        esewaConfig.environment === "production"
          ? "https://epay.esewa.com.np/api/epay/main/v2/form"
          : "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/payments/esewa/verify-return ──────────────────────────────────
// eSewa's real ePay v2 flow redirects the browser (not our server) to
// success_url/failure_url with a single `?data=` param: a base64-encoded JSON
// blob, itself signed with the same HMAC secret used to initiate the payment.
// The frontend lands on that URL, then POSTs the raw `data` string here so we
// can verify it server-side (never trust the redirect alone) before marking
// anything paid.
exports.verifyEsewaReturn = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ success: false, message: "Missing eSewa response data" });
    }

    let parsed;
    try {
      parsed = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    } catch {
      return res.status(400).json({ success: false, message: "Malformed eSewa response" });
    }

    const { transaction_uuid, total_amount, status, signed_field_names, signature } = parsed;
    if (!transaction_uuid || !signed_field_names || !signature) {
      return res.status(400).json({ success: false, message: "Incomplete eSewa response" });
    }

    // Re-derive the signature from the fields eSewa says it signed, in the
    // order it says it signed them — a mismatch means the response was
    // tampered with (or our secret is wrong) and must not be trusted.
    const message = signed_field_names
      .split(",")
      .map((field) => `${field}=${parsed[field]}`)
      .join(",");
    const expectedSignature = crypto
      .createHmac("sha256", esewaConfig.secret)
      .update(message)
      .digest("base64");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Signature verification failed" });
    }

    const booking = await Booking.findOne({ esewaTransactionId: transaction_uuid });
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found for this transaction" });
    }

    // The signature is valid, but make sure the amount actually matches what
    // we charged for — a valid signature on the wrong amount is still wrong.
    if (Math.round(Number(total_amount)) !== Math.round(booking.grandTotal)) {
      return res.status(400).json({ success: false, message: "Amount mismatch" });
    }

    if (status === "COMPLETE") {
      if (booking.paymentStatus !== "paid") {
        booking.paymentStatus = "paid";
        booking.status = "confirmed";
        await booking.save();

        // Attributed to the host, not the paying guest — see note in confirmPayment above.
        await Transaction.create({
          user: booking.host,
          booking: booking._id,
          amount: booking.grandTotal,
          type: "charge",
          status: "completed",
          description: `eSewa payment — transaction ${transaction_uuid}`,
        });
      }
      return res.json({ success: true, paid: true, booking });
    }

    booking.paymentStatus = "failed";
    await booking.save();
    return res.json({ success: true, paid: false, booking, status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
