const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { protect } = require("../middleware/auth.middleware");

// GET /api/reviews/property/:propertyId
router.get("/property/:propertyId", reviewController.getReviewsForProperty);

// POST /api/reviews
router.post("/", protect, reviewController.createReview);

module.exports = router;
