const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { authenticate, authorize } = require('../middleware/auth');

// Get all customers
router.get('/', authenticate, authorize('customer'), async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific customer
router.get('/:id', authenticate, authorize('customer'), async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new customer
// router.post('/', async (req, res) => {
//   const { name, email, ph } = req.body;
//   const customer = new Customer({ name, email, ph });
//   try {
//     await customer.save();
//     res.status(201).json(customer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Update a customer
router.put('/:id', authenticate, authorize('customer'), async (req, res) => {
  const { name, email, ph } = req.body;
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, ph },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a customer
router.delete('/:id', authenticate, authorize('customer'), async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
