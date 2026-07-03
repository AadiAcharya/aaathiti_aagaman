const rateLimit = require('express-rate-limit');

// Tighter limit for credential-guessing endpoints (login, register, password reset)
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts, please try again later' },
  skip: () => process.env.NODE_ENV === 'test',
});
