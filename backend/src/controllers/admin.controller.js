const User = require('../models/User.model');
const Room = require('../models/Room.model');
const Booking = require('../models/Booking.model');
const { Transaction } = require('../models/extras.model');

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
exports.getStats = async (req, res) => {
  try {
    const [users, rooms, bookings, revenue] = await Promise.all([
      User.countDocuments(),
      Room.countDocuments(),
      Booking.countDocuments(),
      Transaction.aggregate([
        { $match: { status: 'completed', type: 'charge' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers: users,
        totalRooms: rooms,
        totalBookings: bookings,
        totalRevenue: revenue[0]?.total || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const skip  = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(query);
    const users = await User.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, count: users.length, total, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/admin/users/:id ─────────────────────────────────────────────────
exports.updateUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ success: false, message: 'User not found' });

    // Admins can't act on themselves or other admins through this panel
    if (target.role === 'admin' || target._id.equals(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Cannot modify your own account or another admin from this panel',
      });
    }

    // Whitelist fields — never let admin-panel input reach fields like
    // `password` directly, since findByIdAndUpdate skips the pre('save')
    // hashing hook and would store it in plaintext.
    const updates = {};
    if (req.body.role !== undefined) {
      if (!['user', 'host'].includes(req.body.role)) {
        return res.status(400).json({ success: false, message: "Role must be 'user' or 'host'" });
      }
      updates.role = req.body.role;
    }
    if (req.body.isBanned !== undefined) updates.isBanned = !!req.body.isBanned;
    if (req.body.banReason !== undefined) updates.banReason = String(req.body.banReason);

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true,
    });

    // Banning a host deactivates all of their listings so guests stop seeing them
    if (updates.isBanned === true && user.role === 'host') {
      await Room.updateMany({ host: user._id }, { isAvailable: false });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE /api/admin/users/:id ──────────────────────────────────────────────
exports.deleteUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ success: false, message: 'User not found' });

    if (target.role === 'admin' || target._id.equals(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete your own account or another admin from this panel',
      });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/admin/listings ──────────────────────────────────────────────────
exports.getListings = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { title:    { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }
    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Room.countDocuments(query);
    const rooms = await Room.find(query)
      .populate('host', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json({ success: true, count: rooms.length, total, rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/admin/listings/:id ──────────────────────────────────────────────
// Toggle a listing's availability (deactivate/reactivate) without banning the host
exports.updateListing = async (req, res) => {
  try {
    if (req.body.isAvailable === undefined) {
      return res.status(400).json({ success: false, message: 'isAvailable is required' });
    }
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isAvailable: !!req.body.isAvailable },
      { new: true, runValidators: true }
    ).populate('host', 'name email');
    if (!room) return res.status(404).json({ success: false, message: 'Listing not found' });
    res.json({ success: true, room });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE /api/admin/listings/:id ───────────────────────────────────────────
exports.deleteListing = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Listing not found' });
    res.json({ success: true, message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── DELETE /api/admin/listings/:id/reviews/:reviewId ─────────────────────────
exports.deleteListingReview = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Listing not found' });

    const review = room.reviewsArray.id(req.params.reviewId);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    review.deleteOne();
    room.updateRating();
    await room.save();

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/admin/bookings ──────────────────────────────────────────────────
exports.getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('room', 'title price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json({ success: true, count: bookings.length, total, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
