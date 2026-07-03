const Room = require('../models/Room.model');
const Booking = require('../models/Booking.model');
const { Notification, Transaction } = require('../models/extras.model');
const { formatNPR } = require('../utils/currency');

// ─── GET /api/host/dashboard ──────────────────────────────────────────────────
// Stats for RoomStatus.jsx dashboard cards
exports.getDashboard = async (req, res) => {
  try {
    const hostId = req.user.id;

    const [rooms, bookings, transactions] = await Promise.all([
      Room.find({ host: hostId }, 'title rating'),
      Booking.find({ host: hostId }, 'room status grandTotal createdAt checkIn checkOut guests user')
        .populate('user', 'name avatar'),
      Transaction.find({ user: hostId, type: 'charge', status: 'completed' }, 'amount createdAt'),
    ]);

    const totalListings  = rooms.length;
    const activeBookings = bookings.filter((b) => b.status === 'confirmed').length;
    const totalRevenue   = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgRating = rooms.length
      ? (rooms.reduce((s, r) => s + r.rating, 0) / rooms.length).toFixed(1)
      : 0;

    // Per-listing breakdown: bookings count + revenue for each of the host's rooms
    const listingBreakdown = rooms.map((room) => {
      const roomBookings = bookings.filter((b) => b.room.toString() === room._id.toString());
      const revenue = roomBookings
        .filter((b) => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + b.grandTotal, 0);
      return {
        roomId: room._id,
        title: room.title,
        bookingsCount: roomBookings.length,
        revenue,
      };
    }).sort((a, b) => b.revenue - a.revenue);

    // Revenue trend for the last 6 months (including months with no revenue)
    const monthlyRevenue = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd   = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const total = transactions
        .filter((t) => t.createdAt >= monthStart && t.createdAt < monthEnd)
        .reduce((sum, t) => sum + t.amount, 0);
      monthlyRevenue.push({
        label: monthStart.toLocaleString('en-US', { month: 'short' }),
        total,
      });
    }

    const bookingStatusBreakdown = {
      pending: bookings.filter((b) => b.status === 'pending').length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    };

    // Confirmed stays checking in within the next 7 days — a quick "what's
    // coming up" glance for the host, sorted soonest first.
    const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const roomById = Object.fromEntries(rooms.map((r) => [r._id.toString(), r]));
    const upcomingCheckIns = bookings
      .filter((b) => b.status === 'confirmed' && b.checkIn >= now && b.checkIn <= weekFromNow)
      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn))
      .slice(0, 5)
      .map((b) => ({
        bookingId: b._id,
        guestName: b.user?.name || 'Guest',
        guestAvatar: b.user?.avatar || '',
        roomTitle: roomById[b.room.toString()]?.title || 'Room',
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        guests: b.guests,
      }));

    res.json({
      success: true,
      stats: {
        totalListings,
        activeBookings,
        totalRevenue: totalRevenue.toFixed(2),
        avgRating,
      },
      listingBreakdown,
      monthlyRevenue,
      bookingStatusBreakdown,
      upcomingCheckIns,
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
          priceDisplay: `${formatNPR(room.price)}/night`,
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

    // A stay can only be confirmed complete once checkout has actually passed —
    // this is what unlocks the guest's ability to leave a review, so it can't
    // be marked early.
    if (status === 'completed') {
      if (booking.status !== 'confirmed') {
        return res.status(400).json({
          success: false,
          message: 'Only a confirmed booking can be marked as completed',
        });
      }
      if (new Date(booking.checkOut) > new Date()) {
        return res.status(400).json({
          success: false,
          message: 'This stay cannot be marked complete until after checkout',
        });
      }
    }

    const previousStatus = booking.status;
    booking.status = status;
    await booking.save();

    // Releasing a booking (rejected/cancelled by host) must free up the blocked dates
    if (status === 'cancelled' && previousStatus !== 'cancelled') {
      await Room.findByIdAndUpdate(booking.room, {
        $pull: { bookedDates: { checkIn: booking.checkIn, checkOut: booking.checkOut } },
      });
    }

    if (status !== previousStatus) {
      const room = await Room.findById(booking.room).select('title');
      const statusMessages = {
        confirmed: `Your booking for "${room?.title || 'the room'}" has been confirmed by the host.`,
        cancelled: `Your booking for "${room?.title || 'the room'}" was declined by the host.`,
        completed: `Your stay at "${room?.title || 'the room'}" has been marked complete.`,
      };
      if (statusMessages[status]) {
        await Notification.create({
          user:      booking.user,
          title:     'Booking Update',
          message:   statusMessages[status],
          type:      'booking',
          relatedId: booking._id,
          link:      '/reservation',
        });
      }
    }

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
