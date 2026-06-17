const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, maxlength: 500 },
  progress: { type: Number, default: 0, min: 0 },
  target: { type: Number, required: true, min: 1 },
  unit: { type: String, default: '%' },
  deadline: Date,
  category: {
    type: String,
    enum: ['Learning', 'DSA', 'Portfolio', 'Career', 'Other'],
    default: 'Other'
  },
  reminder: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  completedAt: Date,
  streakCount: { type: Number, default: 0 },
  lastActiveDate: Date
}, { timestamps: true })

goalSchema.index({ userId: 1, completed: 1 })

module.exports = mongoose.model('Goal', goalSchema)
