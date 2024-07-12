// Import necessary modules and libraries
const express = require('express');
const router = express.Router(); // Create a new router instance for handling routes
const Owner = require('../models/Owner'); // Import the Owner model
const { authenticate, authorize } = require('../middleware/auth'); // Import authentication and authorization middleware

// Route to get all owners
router.get('/', authenticate, authorize('owner'), async (req, res) => {
  try {
    // Find all owners in the database
    const owners = await Owner.find();
    // Send the list of owners in the response
    res.json(owners);
  } catch (error) {
    // Handle any errors that occur while fetching owners
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific owner by ID
router.get('/:id', authenticate, authorize('owner'), async (req, res) => {
  try {
    // Find the owner by ID from the URL parameters
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      // If owner is not found, send a 404 status with an error message
      return res.status(404).json({ error: 'Owner not found' });
    }
    // Send the owner details in the response
    res.json(owner);
  } catch (error) {
    // Handle any errors that occur while fetching the owner
    res.status(500).json({ error: error.message });
  }
});

// Route to update an owner by ID
router.put('/:id', authenticate, authorize('owner'), async (req, res) => {
  const { name, email, ph } = req.body;
  try {
    // Find the owner by ID and update with new values
    const owner = await Owner.findByIdAndUpdate(
      req.params.id, // ID from URL parameters
      { name, email, ph }, // New values to update
      { new: true } // Return the updated owner
    );
    if (!owner) {
      // If owner is not found, send a 404 status with an error message
      return res.status(404).json({ error: 'Owner not found' });
    }
    // Send the updated owner details in the response
    res.json(owner);
  } catch (error) {
    // Handle any errors that occur while updating the owner
    res.status(400).json({ error: error.message });
  }
});

// Route to delete an owner by ID
router.delete('/:id', authenticate, authorize('owner'), async (req, res) => {
  try {
    // Find the owner by ID and delete
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) {
      // If owner is not found, send a 404 status with an error message
      return res.status(404).json({ error: 'Owner not found' });
    }
    // Send a confirmation message in the response
    res.json({ message: 'Owner deleted' });
  } catch (error) {
    // Handle any errors that occur while deleting the owner
    res.status(500).json({ error: error.message });
  }
});

// Export the router to be used in the main application
module.exports = router;
