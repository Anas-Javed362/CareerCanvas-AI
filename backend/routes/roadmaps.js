const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const Roadmap = require('../models/Roadmap')

router.use(protect)

// GET user's roadmaps
router.get('/', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json({ roadmaps })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST create roadmap
router.post('/', async (req, res) => {
  try {
    const roadmap = await Roadmap.create({ ...req.body, userId: req.user.id })
    res.status(201).json({ roadmap })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// PUT update roadmap milestone statuses
router.put('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    )
    if (!roadmap) return res.status(404).json({ error: 'Roadmap not found' })
    res.json({ roadmap })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// DELETE roadmap
router.delete('/:id', async (req, res) => {
  try {
    await Roadmap.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    res.json({ message: 'Deleted' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
