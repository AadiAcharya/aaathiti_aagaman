const Booking = require('../models/Booking.model');
const Room = require('../models/Room.model');
const { Notification } = require('../models/extras.model');

// ─── POST /api/bookings ───────────────────────────────────────────────────────
exports.createBooking = async (req, res) => {
  try {
    const {
      roomId, checkIn, checkOut, guests,
      guestName, guestEmail, guestPhone, specialRequests,
    } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    if (!room.isAvailable) {
      return res.status(400).json({ success: false, message: 'Room is not available' });
    }

    // Check date conflict
    const reqIn  = new Date(checkIn);
    const reqOut = new Date(checkOut);
    if (reqIn >= reqOut) {
      return res.status(400).json({ success: false, message: 'Check-out must be after check-in' });
    }
    const conflict = room.bookedDates.some(
      (d) => !(reqOut <= d.checkIn || reqIn >= d.checkOut)
    );
    if (conflict) {
      return res.status(400).json({ success: false, message: 'Room is already booked for these dates' });
    }

    const nights = Math.ceil((reqOut - reqIn) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;
    const taxes      = Math.round(totalPrice * 0.1 * 100) / 100; // 10% tax
    const grandTotal = totalPrice + taxes;

    const booking = await Booking.create({
      user:          req.user.id,
      room:          roomId,
      host:          room.host,
      checkIn:       reqIn,
      checkOut:      reqOut,
      guests,
      nights,
      pricePerNight: room.price,
      totalPrice,
      taxes,
      grandTotal,
      guestName:     guestName  || req.user.name,
      guestEmail:    guestEmail || req.user.email,
      guestPhone,
      specialRequests,
    });

    // Block those dates on the room
    room.bookedDates.push({ checkIn: reqIn, checkOut: reqOut });
    await room.save();

    // Notify host
    if (room.host) {
      await Notification.create({
        user:      room.host,
        title:     'New Booking',
        message:   `${req.user.name} booked "${room.title}" from ${reqIn.toDateString()} to ${reqOut.toDateString()}`,
        type:      'booking',
        relatedId: booking._id,
        link:      `/reservation`,
      });
    }

    await booking.populate('room', 'title image price');
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── GET /api/bookings/my ─────────────────────────────────────────────────────
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('room', 'title image price type')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/bookings/:id ────────────────────────────────────────────────────
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('room', 'title image price amenities')
      .populate('user', 'name email avatar');

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    // Only booking owner, the room host, or admin
    const isOwner = booking.user._id.toString() === req.user.id;
    const isHost  = booking.host?.toString() === req.user.id;
    if (!isOwner && !isHost && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/bookings/:id/cancel ────────────────────────────────────────────
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Remove date block from room
    await Room.findByIdAndUpdate(booking.room, {
      $pull: { bookedDates: { checkIn: booking.checkIn, checkOut: booking.checkOut } },
    });

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
