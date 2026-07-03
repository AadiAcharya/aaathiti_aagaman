// report.routes.js
const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const Report = require('../models/Report.model');

// ─── POST /api/reports ─────────────────────────────────────────────────────────
// Any authenticated user can file a report - this is the "last resort" escalation
// path when a host is unresponsive or a user feels a rule has been violated.
router.post('/', protect, async (req, res) => {
  try {
    const { subject, message, reportedUserId, roomId } = req.body;
    if (!subject?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'Subject and message are required' });
    }

    const report = await Report.create({
      reporter:     req.user.id,
      reportedUser: reportedUserId || undefined,
      room:         roomId || undefined,
      subject:      subject.trim(),
      message:      message.trim(),
    });

    res.status(201).json({ success: true, report });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─── GET /api/reports ───────────────────────────────────────────────────────────
// Admin-only: list all reports
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Report.countDocuments(query);
    const reports = await Report.find(query)
      .populate('reporter', 'name email')
      .populate('reportedUser', 'name email role')
      .populate('room', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json({ success: true, count: reports.length, total, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── PUT /api/reports/:id ───────────────────────────────────────────────────────
// Admin-only: update a report's status
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });
    res.json({ success: true, report });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
