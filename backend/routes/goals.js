const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const Goal = require('../models/Goal')

router.use(protect)

// GET all goals for user
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json({ goals })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST create goal
router.post('/', async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, userId: req.user.id })
    res.status(201).json({ goal })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// PUT update goal
router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body }

    // Auto-mark completed if progress >= target
    if (updates.progress !== undefined && updates.target !== undefined) {
      if (updates.progress >= updates.target) {
        updates.completed = true
        updates.completedAt = new Date()
      } else {
        updates.completed = false
        updates.completedAt = null
      }
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true, runValidators: true }
    )
    if (!goal) return res.status(404).json({ error: 'Goal not found' })
    res.json({ goal })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// DELETE goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!goal) return res.status(404).json({ error: 'Goal not found' })
    res.json({ message: 'Goal deleted successfully' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
