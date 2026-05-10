const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking.model');
const { Transaction } = require('../models/extras.model');

// ─── POST /api/payments/create-intent ────────────────────────────────────────
// Creates a Stripe PaymentIntent for a booking
exports.createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate('room', 'title');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(booking.grandTotal * 100), // Stripe uses cents
      currency: 'usd',
      metadata: {
        bookingId: booking._id.toString(),
        userId:    req.user.id,
        roomTitle: booking.room?.title || '',
      },
    });

    // Save intent ID on booking
    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.json({
      success:      true,
      clientSecret: paymentIntent.client_secret,
      amount:       booking.grandTotal,
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
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    booking.paymentStatus = 'paid';
    booking.status        = 'confirmed';
    booking.paymentIntentId = paymentIntentId;
    await booking.save();

    // Record transaction
    await Transaction.create({
      user:                  req.user.id,
      booking:               booking._id,
      amount:                booking.grandTotal,
      type:                  'charge',
      status:                'completed',
      stripePaymentIntentId: paymentIntentId,
      description:           `Payment for booking #${booking._id}`,
    });

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/payments/webhook ───────────────────────────────────────────────
// Stripe webhook (raw body required — configure in server.js if needed)
exports.stripeWebhook = async (req, res) => {
  const sig     = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent  = event.data.object;
    const booking = await Booking.findOne({ paymentIntentId: intent.id });
    if (booking) {
      booking.paymentStatus = 'paid';
      booking.status        = 'confirmed';
      await booking.save();
    }
  }

  res.json({ received: true });
};

// ─── GET /api/payments/transactions ──────────────────────────────────────────
exports.getMyTransactions = async (req, res) => {
  try {
    const { Transaction } = require('../models/extras.model');
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('booking', 'checkIn checkOut grandTotal')
      .sort({ createdAt: -1 });
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
