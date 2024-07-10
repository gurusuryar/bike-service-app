const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authenticate, authorize } = require('../middleware/auth');

// Get all services for the authenticated owner
router.get('/', authenticate, authorize('owner'), async (req, res) => {
  try {
    const services = await Service.find({ ownerId: req.user.id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific service
router.get('/:id', authenticate, authorize('owner'), async (req, res) => {
  try {
  
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    if (service.ownerId !== req.user.id) {
  
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new service
router.post('/', authenticate, authorize('owner'), async (req, res) => {
  const { name, description, price } = req.body;
  const service = new Service({ name, description, price, ownerId: req.user.id });
  try {
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a service
router.put('/:id', authenticate, authorize('owner'), async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (!service.ownerId.equals(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    service.name = name;
    service.description = description;
    service.price = price;
    await service.save();
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a service
router.delete('/:id', authenticate, authorize('owner'), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    if (!service.ownerId.equals(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await service.delete();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
