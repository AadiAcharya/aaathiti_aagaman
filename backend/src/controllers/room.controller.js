const Room = require('../models/Room.model');
const Booking = require('../models/Booking.model');
const { geocodeLocation } = require('../utils/geocode');

// ─── GET /api/rooms ───────────────────────────────────────────────────────────
// Supports: ?type=suite&priceRange=15000-30000&sortBy=price-low&page=1&limit=6&checkIn=&checkOut=&guests=
exports.getRooms = async (req, res) => {
  try {
    const { type, priceRange, sortBy, page = 1, limit = 6, search, checkIn, checkOut, guests } = req.query;

    const query = { isAvailable: true };

    // Filter by type
    if (type && type !== 'all') query.type = type;

    // Filter by price range in NRS (matches frontend logic)
    if (priceRange === 'under-15000') {
      query.price = { $lt: 15000 };
    } else if (priceRange === '15000-30000') {
      query.price = { $gte: 15000, $lte: 30000 };
    } else if (priceRange === 'over-30000') {
      query.price = { $gt: 30000 };
    }

    // Search by title/description
    if (search) {
      query.$or = [
        { title:       { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Guest capacity
    if (guests) query.maxGuests = { $gte: Number(guests) };

    // Exclude rooms with a booking that overlaps the requested date range
    // (same overlap rule as checkAvailability below).
    if (checkIn && checkOut) {
      const reqIn = new Date(checkIn);
      const reqOut = new Date(checkOut);
      query.bookedDates = {
        $not: {
          $elemMatch: { checkIn: { $lt: reqOut }, checkOut: { $gt: reqIn } },
        },
      };
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
    // A pin dropped on the map picker takes priority over auto-geocoding the address text.
    const hasClientCoords = typeof req.body.lat === 'number' && typeof req.body.lng === 'number';
    const coords = hasClientCoords ? null : await geocodeLocation(req.body.location);
    const room = await Room.create({
      ...req.body,
      host: req.user.id,
      ...(coords || {}),
    });
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

    const updates = { ...req.body };
    const hasClientCoords = typeof updates.lat === 'number' && typeof updates.lng === 'number';
    // Re-geocode only when the location text changed and no map pin was supplied
    if (!hasClientCoords && updates.location && updates.location !== room.location) {
      const coords = await geocodeLocation(updates.location);
      if (coords) Object.assign(updates, coords);
    }

    room = await Room.findByIdAndUpdate(req.params.id, updates, {
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
// Reviews are only allowed for a specific completed, unreviewed stay — this
// prevents anyone from reviewing a room they never actually booked.
exports.addReview = async (req, res) => {
  try {
    if (req.user.role === 'host' || req.user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Host accounts cannot leave reviews. Please use a guest account.',
      });
    }

    const { rating, comment, bookingId } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

    const booking = await Booking.findById(bookingId);
    if (!booking || booking.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.room.toString() !== room._id.toString()) {
      return res.status(400).json({ success: false, message: 'Booking does not match this room' });
    }
    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'You can only review a stay after the host has marked it complete',
      });
    }
    if (booking.reviewed) {
      return res.status(400).json({ success: false, message: 'This stay has already been reviewed' });
    }

    room.reviewsArray.push({ user: req.user.id, name: req.user.name, rating, comment });
    room.updateRating();
    await room.save();

    // Mark every completed booking this guest has for this room as reviewed,
    // since only one review per room per guest is stored.
    await Booking.updateMany(
      { user: req.user.id, room: room._id, status: 'completed' },
      { reviewed: true }
    );

    res.status(201).json({ success: true, reviews: room.reviewsArray, rating: room.rating });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
