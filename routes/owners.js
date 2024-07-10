const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');
const { authenticate, authorize } = require('../middleware/auth');

// Get all owners
router.get('/', authenticate, authorize('owner'), async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific owner
router.get('/:id', authenticate, authorize('owner'), async (req, res) => {
  try {
    const owner = await Owner.findById(req.user.id);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an owner
router.put('/:id', authenticate, authorize('owner'), async (req, res) => {
  const { name, email, ph } = req.body;
  try {
    const owner = await Owner.findByIdAndUpdate(
      req.params.id,
      { name, email, ph },
      { new: true }
    );
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an owner
router.delete('/:id', authenticate, authorize('owner'), async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json({ message: 'Owner deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
