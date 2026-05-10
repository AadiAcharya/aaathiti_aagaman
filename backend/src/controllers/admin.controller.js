const User = require('../models/User.model');
const Room = require('../models/Room.model');
const Property = require('../models/Property.model');
const Booking = require('../models/Booking.model');
const { Transaction } = require('../models/extras.model');

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
exports.getStats = async (req, res) => {
  try {
    const [users, rooms, properties, bookings, revenue] = await Promise.all([
      User.countDocuments(),
      Room.countDocuments(),
      Property.countDocuments(),
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
        totalProperties: properties,
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
    const { page = 1, limit = 20, role } = req.query;
    const query = role ? { role } : {};
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE /api/admin/users/:id ──────────────────────────────────────────────
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
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
