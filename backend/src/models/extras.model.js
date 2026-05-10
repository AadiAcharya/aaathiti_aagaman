const mongoose = require('mongoose');

// ─── Transaction ──────────────────────────────────────────────────────────────
const transactionSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    amount:  { type: Number, required: true },
    type:    { type: String, enum: ['charge', 'refund', 'payout'], default: 'charge' },
    status:  { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    stripePaymentIntentId: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

// ─── Message ──────────────────────────────────────────────────────────────────
const messageSchema = new mongoose.Schema(
  {
    sender:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking:   { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    content:   { type: String, required: true },
    isRead:    { type: Boolean, default: false },
    // Thread grouping
    threadId:  { type: String },
  },
  { timestamps: true }
);

// ─── Notification ─────────────────────────────────────────────────────────────
const notificationSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:   { type: String, required: true },
    message: { type: String, required: true },
    type:    {
      type: String,
      enum: ['booking', 'payment', 'message', 'review', 'system'],
      default: 'system',
    },
    isRead:  { type: Boolean, default: false },
    link:    { type: String },
    relatedId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = {
  Transaction:  mongoose.model('Transaction',  transactionSchema),
  Message:      mongoose.model('Message',      messageSchema),
  Notification: mongoose.model('Notification', notificationSchema),
};
