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
          ? "https://esewa.com.np/api/epay/main/v2/form"
          : "https://uat.esewa.com.np/api/epay/main/v2/form",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/payments/esewa/callback ──────────────────────────────────────────
// eSewa payment callback
exports.esewaCallback = async (req, res) => {
  try {
    const { pid, refId, status } = req.query;

    if (!pid || !refId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters" });
    }

    // Extract booking ID from pid (format: bookingId-timestamp)
    const bookingId = pid.split("-")[0];

    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    if (status === "COMPLETE") {
      // Payment successful
      booking.paymentStatus = "paid";
      booking.status = "confirmed";
      booking.esewaRefId = refId;
      await booking.save();

      // Attributed to the host, not the paying guest — see note in confirmPayment above.
      await Transaction.create({
        user: booking.host,
        booking: booking._id,
        amount: booking.grandTotal,
        type: "charge",
        status: "completed",
        description: `eSewa Payment - Ref: ${refId}`,
      });

      return res.json({
        success: true,
        message: "Payment successful",
        booking,
      });
    } else {
      // Payment failed
      booking.paymentStatus = "failed";
      await booking.save();

      return res.status(400).json({
        success: false,
        message: "Payment failed or cancelled",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/payments/esewa/verify ────────────────────────────────────────────
// Verify eSewa payment status
exports.verifyESewaPayment = async (req, res) => {
  try {
    const { refId, pid } = req.query;

    if (!refId || !pid) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameters" });
    }

    // In production, you would call eSewa's verification API here
    // For now, we trust the callback

    const booking = await Booking.findById(pid.split("-")[0]);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.json({
      success: true,
      paymentStatus: booking.paymentStatus,
      booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
