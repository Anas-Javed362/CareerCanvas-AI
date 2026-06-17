const mongoose = require('mongoose')

const internshipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  date: { type: Date },
  status: {
    type: String,
    enum: ['wishlist', 'applied', 'assessment', 'interview', 'offer', 'rejected'],
    default: 'applied'
  },
  notes: { type: String, maxlength: 1000 },
  link: String,
  salary: String,
  location: String
}, { timestamps: true })

internshipSchema.index({ userId: 1, status: 1 })
internshipSchema.index({ userId: 1, date: -1 })

module.exports = mongoose.model('Internship', internshipSchema)
