const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/',              protect, ctrl.createBooking);
router.get('/my',             protect, ctrl.getMyBookings);
router.get('/:id',            protect, ctrl.getBookingById);
router.put('/:id/cancel',     protect, ctrl.cancelBooking);

module.exports = router;
