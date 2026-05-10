const Room = require('../models/Room.model');
const Property = require('../models/Property.model');
const Booking = require('../models/Booking.model');
const { Message, Notification, Transaction } = require('../models/extras.model');

// ─── GET /api/host/dashboard ──────────────────────────────────────────────────
// Stats for RoomStatus.jsx dashboard cards
exports.getDashboard = async (req, res) => {
  try {
    const hostId = req.user.id;

    const [totalListings, bookings, transactions] = await Promise.all([
      Room.countDocuments({ host: hostId }),
      Booking.find({ host: hostId }),
      Transaction.find({ user: hostId, type: 'charge', status: 'completed' }),
    ]);

    const activeBookings = bookings.filter((b) => b.status === 'confirmed').length;
    const totalRevenue   = transactions.reduce((sum, t) => sum + t.amount, 0);

    // Average rating across all host rooms
    const rooms = await Room.find({ host: hostId }, 'rating');
    const avgRating = rooms.length
      ? (rooms.reduce((s, r) => s + r.rating, 0) / rooms.length).toFixed(1)
      : 0;

    res.json({
      success: true,
      stats: {
        totalListings,
        activeBookings,
        totalRevenue: totalRevenue.toFixed(2),
        avgRating,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/host/listings ───────────────────────────────────────────────────
// For the listings table in RoomStatus.jsx
exports.getHostListings = async (req, res) => {
  try {
    const rooms = await Room.find({ host: req.user.id }).sort({ createdAt: -1 });

    // Attach booking count per room
    const enriched = await Promise.all(
      rooms.map(async (room) => {
        const bookings = await Booking.countDocuments({ room: room._id, status: { $ne: 'cancelled' } });
        return {
          ...room.toObject(),
          bookingsCount: bookings,
          status: room.isAvailable ? 'Active' : 'Inactive',
          priceDisplay: `$${room.price}/night`,
        };
      })
    );

    res.json({ success: true, listings: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/host/reservations ───────────────────────────────────────────────
// For HostReservation.jsx
exports.getHostReservations = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { host: req.user.id };
    if (status) query.status = status;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Booking.countDocuments(query);

    const reservations = await Booking.find(query)
      .populate('room', 'title image price type')
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, count: reservations.length, total, reservations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/host/reservations/:id ──────────────────────────────────────────
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findOne({ _id: req.params.id, host: req.user.id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    booking.status = status;
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/host/transactions ───────────────────────────────────────────────
// For TransactionHistory.jsx
exports.getHostTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Transaction.countDocuments({ user: req.user.id });

    const transactions = await Transaction.find({ user: req.user.id })
      .populate('booking', 'checkIn checkOut nights')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, count: transactions.length, total, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/host/messages ───────────────────────────────────────────────────
// For MessagesPage.jsx
exports.getHostMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user.id })
      .populate('sender', 'name avatar email')
      .sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/host/messages ──────────────────────────────────────────────────
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content, bookingId } = req.body;
    const message = await Message.create({
      sender:    req.user.id,
      recipient: recipientId,
      content,
      booking:   bookingId,
      threadId:  [req.user.id, recipientId].sort().join('_'),
    });
    await message.populate('sender', 'name avatar');
    res.status(201).json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── GET /api/host/notifications ─────────────────────────────────────────────
// For NotificationsPage.jsx
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    const unreadCount = await Notification.countDocuments({ user: req.user.id, isRead: false });
    res.json({ success: true, notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/host/notifications/read-all ────────────────────────────────────
exports.markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id }, { isRead: true });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
