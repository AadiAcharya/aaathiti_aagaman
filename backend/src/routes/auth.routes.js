const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register',         ctrl.register);
router.post('/login',            ctrl.login);
router.get('/me',                protect, ctrl.getMe);
router.put('/update-profile',    protect, ctrl.updateProfile);
router.put('/change-password',   protect, ctrl.changePassword);
router.post('/wishlist/:roomId', protect, ctrl.toggleWishlist);

module.exports = router;
