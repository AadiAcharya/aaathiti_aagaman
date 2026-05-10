const Room = require('../models/Room.model');

// ─── GET /api/rooms ───────────────────────────────────────────────────────────
// Supports: ?type=suite&priceRange=150-250&sortBy=price-low&page=1&limit=6
exports.getRooms = async (req, res) => {
  try {
    const { type, priceRange, sortBy, page = 1, limit = 6, search } = req.query;

    const query = {};

    // Filter by type
    if (type && type !== 'all') query.type = type;

    // Filter by price range (matches frontend logic)
    if (priceRange === 'under-150') {
      query.price = { $lt: 150 };
    } else if (priceRange === '150-250') {
      query.price = { $gte: 150, $lte: 250 };
    } else if (priceRange === 'over-250') {
      query.price = { $gt: 250 };
    }

    // Search by title/description
    if (search) {
      query.$or = [
        { title:       { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort options (match frontend sortBy values)
    let sort = {};
    if (sortBy === 'price-low')  sort = { price: 1 };
    else if (sortBy === 'price-high') sort = { price: -1 };
    else if (sortBy === 'rating')     sort = { rating: -1 };
    else sort = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Room.countDocuments(query);

    const rooms = await Room.find(query)
      .populate('host', 'name avatar email')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: rooms.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      rooms,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/rooms/:id ───────────────────────────────────────────────────────
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('host', 'name avatar email phone');
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/rooms ──────────────────────────────────────────────────────────
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create({ ...req.body, host: req.user.id });
    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/rooms/:id ───────────────────────────────────────────────────────
exports.updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

    // Only host or admin can update
    if (room.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    res.json({ success: true, room });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE /api/rooms/:id ────────────────────────────────────────────────────
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

    if (room.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await room.deleteOne();
    res.json({ success: true, message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/rooms/:id/availability ─────────────────────────────────────────
exports.checkAvailability = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    const room = await Room.findById(req.params.id, 'bookedDates isAvailable title');
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

    if (!room.isAvailable) {
      return res.json({ success: true, available: false, reason: 'Room is not available' });
    }

    if (checkIn && checkOut) {
      const reqIn  = new Date(checkIn);
      const reqOut = new Date(checkOut);
      const conflict = room.bookedDates.some(
        (d) => !(reqOut <= d.checkIn || reqIn >= d.checkOut)
      );
      return res.json({ success: true, available: !conflict });
    }

    res.json({ success: true, available: room.isAvailable, bookedDates: room.bookedDates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/rooms/:id/reviews ──────────────────────────────────────────────
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

    // Check if user already reviewed
    const alreadyReviewed = room.reviewsArray.find(
      (r) => r.user?.toString() === req.user.id
    );
    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'You already reviewed this room' });
    }

    room.reviewsArray.push({ user: req.user.id, name: req.user.name, rating, comment });
    room.updateRating();
    await room.save();

    res.status(201).json({ success: true, reviews: room.reviewsArray, rating: room.rating });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
