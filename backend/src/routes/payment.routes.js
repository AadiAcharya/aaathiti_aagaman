const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/payment.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/create-intent',  protect, ctrl.createPaymentIntent);
router.post('/confirm',        protect, ctrl.confirmPayment);
router.post('/webhook',        express.raw({ type: 'application/json' }), ctrl.stripeWebhook);
router.get('/transactions',    protect, ctrl.getMyTransactions);

module.exports = router;
