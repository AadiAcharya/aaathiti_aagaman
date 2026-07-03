const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User.model');
const { sendEmail } = require('../utils/email');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: sign JWT
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id:    user._id,
      name:   user.name,
      email:  user.email,
      role:   user.role,
      avatar: user.avatar,
      phone:  user.phone,
    },
  });
};

// ─── POST /api/auth/register ──────────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === 'host' ? 'host' : 'user', // only allow user/host on register
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/auth/google ────────────────────────────────────────────────────
exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ success: false, message: 'Missing Google credential' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture, email_verified: emailVerified } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      // Link to an existing email/password account if one exists
      user = await User.findOne({ email });
      if (user) {
        user.googleId = googleId;
        if (!user.avatar) user.avatar = picture;
        await user.save();
      } else {
        user = await User.create({
          name,
          email,
          googleId,
          avatar: picture,
          isVerified: !!emailVerified,
        });
      }
    }

    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        message: user.banReason
          ? `Your account has been suspended: ${user.banReason}`
          : 'Your account has been suspended.',
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(401).json({ success: false, message: 'Google authentication failed' });
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        message: user.banReason
          ? `Your account has been suspended: ${user.banReason}`
          : 'Your account has been suspended.',
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      'wishlist',
      'title image price priceDisplay rating reviews',
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/auth/update-profile ────────────────────────────────────────────
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, avatar },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/auth/change-password ───────────────────────────────────────────
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/auth/forgot-password ──────────────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Always respond with success so this endpoint can't be used to enumerate emails
    if (!user) {
      return res.json({
        success: true,
        message: 'If an account with that email exists, a reset link has been sent.',
      });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset — Aathiti Aagaman',
        text: `You requested a password reset. Click the link below to set a new password. This link expires in 30 minutes.\n\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`,
      });
    } catch (emailErr) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: 'Could not send reset email' });
    }

    res.json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/auth/reset-password/:token ─────────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Reset link is invalid or has expired' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/auth/become-host ────────────────────────────────────────────────
exports.becomeHost = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      return res.status(400).json({ success: false, message: 'Admins do not need host status' });
    }
    if (req.user.role === 'host') {
      return res.json({ success: true, user: req.user });
    }

    const { phone, address, governmentId, propertyType, bio } = req.body;
    if (!phone || !address || !governmentId) {
      return res.status(400).json({
        success: false,
        message: 'Phone, address, and government ID are required to verify your host application',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        role: 'host',
        phone,
        hostProfile: {
          phone,
          address,
          governmentId,
          propertyType: propertyType || '',
          bio: bio || '',
          submittedAt: new Date(),
        },
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/auth/wishlist/:roomId ─────────────────────────────────────────
exports.toggleWishlist = async (req, res) => {
  try {
    if (req.user.role === 'host' || req.user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Host accounts cannot use wishlists. Please use a guest account.',
      });
    }

    const user = await User.findById(req.user.id);
    const roomId = req.params.roomId;
    const idx = user.wishlist.indexOf(roomId);

    if (idx > -1) {
      user.wishlist.splice(idx, 1);
    } else {
      user.wishlist.push(roomId);
    }
    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
