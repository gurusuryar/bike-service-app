const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Owner = require('../models/Owner');
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../middleware/auth');
require('dotenv').config();

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

// User registration (Role: Owner or Customer)
router.post('/register', async (req, res) => {
  const { email, password, role, name, ph } = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let entity;
    if (role === 'owner') {
      const user = new User({ email, password: hashedPassword, role, name, ph });
      await user.save();
      entity = new Owner({ _id: user._id, name, email, ph });
      await entity.save();
      const token = generateToken({ userId: user._id, role: user.role });
      res.status(201).json({ token, role: user.role });
    } else {
      const user = new User({ email, password: hashedPassword, role, name, ph });
      await user.save();
      entity = new Customer({ _id: user._id, name, email, ph });
      await entity.save();
      const token = generateToken({ userId: user._id, role: user.role });
      res.status(201).json({ token, role: user.role });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// User login (Role: Owner or Customer)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'New User Sign up first..' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch entity details
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let entity;
    if (user.role === 'owner') {
      entity = await Owner.findById(user.id);
    } else {
      entity = await Customer.findById(user.id);
    }
    res.json(entity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
