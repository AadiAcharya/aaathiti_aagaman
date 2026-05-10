const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },

    // Stay details
    checkIn:    { type: Date, required: true },
    checkOut:   { type: Date, required: true },
    guests:     { type: Number, default: 1 },
    nights:     { type: Number },

    // Pricing
    pricePerNight: { type: Number, required: true },
    totalPrice:    { type: Number, required: true },
    taxes:         { type: Number, default: 0 },
    grandTotal:    { type: Number, required: true },

    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    paymentIntentId: { type: String },
    stripeSessionId: { type: String },

    // Guest info
    guestName:  { type: String },
    guestEmail: { type: String },
    guestPhone: { type: String },

    specialRequests: { type: String, default: '' },

    // Host (for easy host-side queries)
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Auto-calculate nights before saving
bookingSchema.pre('save', function (next) {
  if (this.checkIn && this.checkOut) {
    const diff = this.checkOut.getTime() - this.checkIn.getTime();
    this.nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
