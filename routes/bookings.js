const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authenticate, authorize } = require('../middleware/auth');
const sendEmail = require('../utils/email');
const Customer=require('../models/Customer')

// Get all bookings
router.get('/', authenticate, authorize('owner'), async (req, res) => {
  try {
    const bookings = await Booking.find().populate('customerId').populate('serviceId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific booking
router.get('/:id', authenticate, authorize('customer'), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('customerId').populate('serviceId');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new booking
const Service = require('../models/Service');
const Owner = require('../models/Owner');

// Create a new booking
router.post('/', authenticate, authorize('customer'), async (req, res) => {
  const { serviceId, name, model, year, licensePlate, date } = req.body;

  try {
    // Find the service associated with the serviceId
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Find the owner associated with the service
    const owner = await Owner.findById(service.ownerId);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    // Create a new booking
    const booking = new Booking({ customerId: req.user.id, serviceId, name, model, year, licensePlate, date, status: 'pending' });
    await booking.save();

    // Send email notification to the owner through bridge email
    sendEmail(owner.email, 'New Booking', `A new booking has been created for service ID ${booking.serviceId}.`);

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Update a booking
router.put('/:id', authenticate, authorize('customer'), async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark a booking as ready for delivery
router.post('/:id/ready', authenticate, authorize('owner'), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'ready for delivery' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Find the customer associated with the booking
    const customer = await Customer.findById(booking.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Send email notification to the customer
    sendEmail(customer.email, 'Booking Ready for Delivery', `Your booking with service ID ${booking.serviceId} is now ready for delivery.`);

    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Mark a booking as completed
router.post('/:id/complete', authenticate, authorize('owner'), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;