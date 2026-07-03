// message.routes.js
const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { Message } = require('../models/extras.model');

router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { recipient: req.user.id }],
    })
      .populate('sender',    'name avatar')
      .populate('recipient', 'name avatar')
      .populate('room',      'title image')
      .sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { recipientId, content, roomId, bookingId } = req.body;
    if (!recipientId || !content?.trim()) {
      return res.status(400).json({ success: false, message: 'recipientId and content are required' });
    }

    // If the client didn't say which room this is about (e.g. a reply sent from
    // an already-open thread), inherit it from the last message between these two
    // people instead of dropping it - otherwise a reply silently splits off into a
    // brand-new "general" thread instead of continuing the room-specific one.
    let effectiveRoomId = roomId || undefined;
    if (!effectiveRoomId) {
      const lastWithRoom = await Message.findOne({
        $or: [
          { sender: req.user.id, recipient: recipientId },
          { sender: recipientId, recipient: req.user.id },
        ],
        room: { $exists: true, $ne: null },
      }).sort({ createdAt: -1 });
      if (lastWithRoom) effectiveRoomId = lastWithRoom.room;
    }

    const pairKey = [req.user.id, recipientId].sort().join('_');
    const message = await Message.create({
      sender:    req.user.id,
      recipient: recipientId,
      content:   content.trim(),
      room:      effectiveRoomId,
      booking:   bookingId || undefined,
      threadId:  effectiveRoomId ? `${pairKey}_${effectiveRoomId}` : pairKey,
    });
    await message.populate('sender', 'name avatar');
    await message.populate('recipient', 'name avatar');
    await message.populate('room', 'title image');
    res.status(201).json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/:id/read', protect, async (req, res) => {
  try {
    const msg = await Message.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.id },
      { isRead: true },
      { new: true }
    );
    res.json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
