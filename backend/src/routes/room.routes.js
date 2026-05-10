const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/room.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public
router.get('/',                    ctrl.getRooms);
router.get('/:id',                 ctrl.getRoomById);
router.get('/:id/availability',    ctrl.checkAvailability);

// Protected
router.post('/',                   protect, authorize('host', 'admin'), ctrl.createRoom);
router.put('/:id',                 protect, authorize('host', 'admin'), ctrl.updateRoom);
router.delete('/:id',              protect, authorize('host', 'admin'), ctrl.deleteRoom);
router.post('/:id/reviews',        protect, ctrl.addReview);

module.exports = router;
