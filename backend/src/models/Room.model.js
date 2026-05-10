const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:    { type: String, required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const roomSchema = new mongoose.Schema(
  {
    title:       { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    image:       { type: String, default: '' },
    images:      [{ type: String }],

    // Pricing
    price:        { type: Number, required: [true, 'Price is required'] },
    priceDisplay: { type: String },   // e.g. "$180"
    shortPeriodPrice:  { type: Number },
    mediumPeriodPrice: { type: Number },
    longPeriodPrice:   { type: Number },

    // Room Details
    type:      { type: String, enum: ['single', 'double', 'suite'], required: true },
    bedType:   { type: String, default: '' },
    size:      { type: String, default: '' },
    maxGuests: { type: Number, default: 1 },

    // Amenities & Safety
    amenities: [{ type: String }],
    safety:    [{ type: String }],

    // Ratings
    rating:  { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    reviewsArray: [reviewSchema],

    // Availability
    isAvailable: { type: Boolean, default: true },
    bookedDates: [
      {
        checkIn:  { type: Date },
        checkOut: { type: Date },
      },
    ],

    // Host
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Recalculate average rating when a review is added
roomSchema.methods.updateRating = function () {
  if (this.reviewsArray.length === 0) {
    this.rating = 0;
    this.reviews = 0;
  } else {
    const total = this.reviewsArray.reduce((acc, r) => acc + r.rating, 0);
    this.rating = Math.round((total / this.reviewsArray.length) * 10) / 10;
    this.reviews = this.reviewsArray.length;
  }
};

module.exports = mongoose.model('Room', roomSchema);
