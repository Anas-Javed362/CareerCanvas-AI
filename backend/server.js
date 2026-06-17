const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Security middleware ──────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// ── Rate limiting ────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Please try again later.' }
})
app.use('/api/', limiter)

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Database connection ──────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careercanvas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected')
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message)
})

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))
app.use('/api/roadmaps', require('./routes/roadmaps'))
app.use('/api/internships', require('./routes/internships'))
app.use('/api/goals', require('./routes/goals'))
app.use('/api/recommendations', require('./routes/recommendations'))

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// ── 404 handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  const status = err.statusCode || 500
  res.status(status).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 CareerCanvas AI server running on port ${PORT}`)
})

module.exports = app
