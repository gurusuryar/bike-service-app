// Import necessary modules and libraries
const express = require("express");
const router = express.Router(); // Create a new router instance for handling routes
const Customer = require("../models/Customer"); // Import the Customer model
const { authenticate, authorize } = require("../middleware/auth"); // Import authentication and authorization middleware

// Route to get all customers
router.get("/", authenticate, authorize("customer"), async (req, res) => {
  try {
    // Retrieve all customers from the database
    const customers = await Customer.find();
    // Send the list of customers as a JSON response
    res.json(customers);
  } catch (error) {
    // Handle any errors that occur while fetching customers
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific customer by ID
router.get("/:id", authenticate, authorize("customer"), async (req, res) => {
  try {
    // Find the customer by ID from the URL parameters
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      // If the customer is not found, send a 404 status with an error message
      return res.status(404).json({ error: "Customer not found" });
    }
    // Send the customer details as a JSON response
    res.json(customer);
  } catch (error) {
    // Handle any errors that occur while fetching the customer
    res.status(500).json({ error: error.message });
  }
});

// Route to update a customer by ID
router.put("/:id", authenticate, authorize("customer"), async (req, res) => {
  const { name, email, ph } = req.body;
  try {
    // Find the customer by ID and update with new values
    const customer = await Customer.findByIdAndUpdate(
      req.params.id, // ID from URL parameters
      { name, email, ph }, // New values to update
      { new: true } // Return the updated customer
    );
    if (!customer) {
      // If the customer is not found, send a 404 status with an error message
      return res.status(404).json({ error: "Customer not found" });
    }
    // Send the updated customer details as a JSON response
    res.json(customer);
  } catch (error) {
    // Handle any errors that occur while updating the customer
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a customer by ID
router.delete("/:id", authenticate, authorize("customer"), async (req, res) => {
  try {
    // Find the customer by ID and delete
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      // If the customer is not found, send a 404 status with an error message
      return res.status(404).json({ error: "Customer not found" });
    }
    // Send a confirmation message indicating the customer was deleted
    res.json({ message: "Customer deleted" });
  } catch (error) {
    // Handle any errors that occur while deleting the customer
    res.status(500).json({ error: error.message });
  }
});

// Export the router to be used in the main application
module.exports = router;
