const mongoose = require('mongoose')

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: String,
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  category: String,
  status: { type: String, enum: ['todo', 'in_progress', 'completed'], default: 'todo' },
  order: { type: Number, default: 0 },
  month: Number,
  deadline: Date,
  notes: String,
  resources: [{
    type: { type: String },
    title: String,
    url: String
  }]
})

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  role: { type: String, required: true },
  description: String,
  color: String,
  icon: String,
  milestones: [milestoneSchema],
  profile: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true })

roadmapSchema.index({ userId: 1, createdAt: -1 })

module.exports = mongoose.model('Roadmap', roadmapSchema)
