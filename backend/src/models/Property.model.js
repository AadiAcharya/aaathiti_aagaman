const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    image: { type: String, default: "" },
    images: [{ type: String }],

    // Details
    bedrooms: { type: String, default: "0" },
    bathrooms: { type: String, default: "0" },
    parking: { type: String, default: "0" },
    pets: { type: String, enum: ["Yes", "No"], default: "No" },

    // Price stored as a range string (e.g. "$1500 - 2500 USD") + numeric min/max
    price: { type: String, default: "" },
    priceMin: { type: Number, default: 0 },
    priceMax: { type: Number, default: 0 },

    // Category matches frontend: rooms | flats | villas | hostels
    category: {
      type: String,
      enum: [
        "rooms",
        "flats",
        "villas",
        "hostels",
        "apartments",
        "houses",
        "homestays",
      ],
      required: true,
    },

    isTopRated: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    amenities: [{ type: String }],
    description: { type: String, default: "" },

    // Host / owner
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true },
);

// Text index for search
propertySchema.index({ title: "text", location: "text" });

module.exports = mongoose.model("Property", propertySchema);
