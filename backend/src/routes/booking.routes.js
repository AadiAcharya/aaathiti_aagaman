const express = require('express');
const { body } = require('express-validator');
const router  = express.Router();
const ctrl    = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');

const createBookingRules = [
  body('roomId').isMongoId().withMessage('A valid roomId is required'),
  body('checkIn').isISO8601().withMessage('A valid checkIn date is required'),
  body('checkOut').isISO8601().withMessage('A valid checkOut date is required'),
  body('guests').optional().isInt({ min: 1 }).withMessage('Guests must be a positive number'),
];

router.post('/',              protect, createBookingRules, validate, ctrl.createBooking);
router.get('/my',             protect, ctrl.getMyBookings);
router.get('/:id',            protect, ctrl.getBookingById);
router.put('/:id/cancel',     protect, ctrl.cancelBooking);

module.exports = router;
