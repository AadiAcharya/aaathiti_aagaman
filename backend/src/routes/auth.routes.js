const express = require('express');
const { body } = require('express-validator');
const router  = express.Router();
const ctrl    = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');
const { validate } = require('../middleware/validate.middleware');

const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
const loginRules = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];
const forgotPasswordRules = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
];

router.post('/register',         authLimiter, registerRules, validate, ctrl.register);
router.post('/login',            authLimiter, loginRules, validate, ctrl.login);
router.post('/google',           ctrl.googleAuth);
router.post('/forgot-password',  authLimiter, forgotPasswordRules, validate, ctrl.forgotPassword);
router.put('/reset-password/:token', authLimiter, ctrl.resetPassword);
router.get('/me',                protect, ctrl.getMe);
router.put('/update-profile',    protect, ctrl.updateProfile);
router.put('/change-password',   protect, authLimiter, ctrl.changePassword);
router.put('/become-host',       protect, ctrl.becomeHost);
router.post('/wishlist/:roomId', protect, ctrl.toggleWishlist);

module.exports = router;
