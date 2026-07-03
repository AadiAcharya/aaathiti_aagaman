const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (process.env.NODE_ENV === 'development') {
      if (/^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
    } else {
      if (origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth.routes'));
app.use('/api/rooms',         require('./routes/room.routes'));
app.use('/api/bookings',      require('./routes/booking.routes'));
app.use('/api/payments',      require('./routes/payment.routes'));
app.use('/api/messages',      require('./routes/message.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/admin',         require('./routes/admin.routes'));
app.use('/api/host',          require('./routes/host.routes'));
app.use('/api/reports',       require('./routes/report.routes'));
app.use('/api/upload',        require('./routes/upload.routes'));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hotel API is running' });
});

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
