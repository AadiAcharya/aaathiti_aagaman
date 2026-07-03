const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reporter:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    room:         { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    subject:      { type: String, required: [true, 'Subject is required'], trim: true },
    message:      { type: String, required: [true, 'Message is required'], trim: true },
    status: {
      type: String,
      enum: ['open', 'resolved', 'dismissed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
