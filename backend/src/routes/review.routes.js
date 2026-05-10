// review.routes.js — standalone review queries
const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth.middleware');
const Room = require('../models/Room.model');

// GET /api/reviews/room/:roomId — get all reviews for a room
router.get('/room/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId, 'reviewsArray rating reviews');
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    res.json({ success: true, reviews: room.reviewsArray, rating: room.rating, total: room.reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/reviews/room/:roomId/:reviewId
router.delete('/room/:roomId/:reviewId', protect, async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

    const review = room.reviewsArray.id(req.params.reviewId);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    if (review.user?.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    review.deleteOne();
    room.updateRating();
    await room.save();
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
