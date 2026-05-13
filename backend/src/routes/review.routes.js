const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
const { protect } = require("../middleware/auth.middleware");

router
  .route("/")
  .get(reviewController.getReviewsForProperty)
  .post(protect, reviewController.createReview);

module.exports = router;
