const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');

// ─── POST /api/upload ─────────────────────────────────────────────────────────
// Accepts a single "image" file, returns its public URL
router.post(
  '/',
  protect,
  authorize('host', 'admin'),
  (req, res) => {
    upload.single('image')(req, res, (err) => {
      if (err) return res.status(400).json({ success: false, message: err.message });
      if (!req.file) return res.status(400).json({ success: false, message: 'No image file provided' });
      const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.json({ success: true, url });
    });
  }
);

module.exports = router;
