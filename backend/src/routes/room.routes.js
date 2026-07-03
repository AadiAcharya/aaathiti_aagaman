const express = require('express');
const { body } = require('express-validator');
const router  = express.Router();
const ctrl    = require('../controllers/room.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');

const createRoomRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('type').isIn(['single', 'double', 'suite']).withMessage('Type must be single, double, or suite'),
  body('images').optional().isArray({ max: 5 }).withMessage('You can add up to 5 additional photos'),
];

const addReviewRules = [
  body('bookingId').isMongoId().withMessage('A valid bookingId is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required'),
];

// Public
router.get('/',                    ctrl.getRooms);
router.get('/:id',                 ctrl.getRoomById);
router.get('/:id/availability',    ctrl.checkAvailability);

// Protected
router.post('/',                   protect, authorize('host', 'admin'), createRoomRules, validate, ctrl.createRoom);
router.put('/:id',                 protect, authorize('host', 'admin'), ctrl.updateRoom);
router.delete('/:id',              protect, authorize('host', 'admin'), ctrl.deleteRoom);
router.post('/:id/reviews',        protect, addReviewRules, validate, ctrl.addReview);

module.exports = router;
