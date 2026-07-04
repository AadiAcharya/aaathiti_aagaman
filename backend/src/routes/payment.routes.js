const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/payment.controller");
const { protect } = require("../middleware/auth.middleware");

// Stripe routes
router.post("/create-intent", protect, ctrl.createPaymentIntent);
router.post("/confirm", protect, ctrl.confirmPayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  ctrl.stripeWebhook,
);

// eSewa routes
router.post("/esewa/initiate", protect, ctrl.initiateESewaPayment);
router.post("/esewa/verify-return", protect, ctrl.verifyEsewaReturn);

// Common routes
router.get("/transactions", protect, ctrl.getMyTransactions);

module.exports = router;
