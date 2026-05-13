import Review from "../models/Review.js";
import Property from "../models/Property.model.js";
import asyncHandler from "express-async-handler";

// @desc    Get all reviews for a property
// @route   GET /api/reviews/property/:propertyId
// @access  Public
const getReviewsForProperty = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    property: req.params.propertyId,
  }).populate("user", "name");
  res.json(reviews);
});

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { propertyId, rating, comment } = req.body;

  const property = await Property.findById(propertyId);

  if (property) {
    const alreadyReviewed = await Review.findOne({
      property: propertyId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this property");
    }

    const review = new Review({
      property: propertyId,
      user: req.user._id,
      rating,
      comment,
    });

    await review.save();

    const reviews = await Review.find({ property: propertyId });
    property.reviews = reviews.map((review) => review._id);
    property.numReviews = reviews.length;
    property.rating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await property.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});

export { getReviewsForProperty, createReview };
