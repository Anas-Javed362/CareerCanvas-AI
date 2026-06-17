const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const Internship = require('../models/Internship')

router.use(protect)

// GET all internships for user
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json({ internships })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST create internship
router.post('/', async (req, res) => {
  try {
    const internship = await Internship.create({ ...req.body, userId: req.user.id })
    res.status(201).json({ internship })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// PUT update internship
router.put('/:id', async (req, res) => {
  try {
    const internship = await Internship.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!internship) return res.status(404).json({ error: 'Internship not found' })
    res.json({ internship })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// DELETE internship
router.delete('/:id', async (req, res) => {
  try {
    const internship = await Internship.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!internship) return res.status(404).json({ error: 'Internship not found' })
    res.json({ message: 'Deleted successfully' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
