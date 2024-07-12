const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { authenticate, authorize } = require("../middleware/auth");

// Get all services for customer and specific services provided by owner for owner
router.get("/", authenticate, async (req, res) => {
  try {
    let services;
    console.log("Authenticated user:", req.user); // Debug: check authenticated user details

    if (req.user.role === "owner") {
      // Owners can fetch their own services
      services = await Service.find({ ownerId: req.user._id }).populate(
        "ownerId"
      );
    } else if (req.user.role === "customer") {
      // Customers can fetch all services
      services = await Service.find().populate("ownerId");
    } else {
      return res.status(403).json({ error: "Forbidden" }); // Access denied for other roles
    }

    res.json(services); // Respond with the fetched services
  } catch (error) {
    console.error("Error fetching services:", error); // Log any errors encountered
    res.status(500).json({ error: error.message }); // Respond with internal server error
  }
});

// Get a specific service by ID
router.get("/:id", authenticate, authorize("owner"), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id); // Find service by ID

    if (!service) {
      return res.status(404).json({ error: "Service not found" }); // Service not found
    }

    if (!service.ownerId.equals(req.user.id)) {
      return res.status(403).json({ error: "Forbidden" }); // Owner mismatch
    }

    res.json(service); // Respond with the specific service
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with internal server error
  }
});

// Create a new service
router.post("/", authenticate, authorize("owner"), async (req, res) => {
  const { name, description, price } = req.body; // Extract service details from request body
  const service = new Service({
    name,
    description,
    price,
    ownerId: req.user.id,
  }); // Create new service

  try {
    await service.save(); // Save the new service
    res.status(201).json(service); // Respond with created service
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with bad request error
  }
});

// Update an existing service
router.put("/:id", authenticate, authorize("owner"), async (req, res) => {
  const { name, description, price } = req.body; // Extract updated service details from request body

  try {
    const service = await Service.findById(req.params.id); // Find service by ID

    if (!service) {
      return res.status(404).json({ error: "Service not found" }); // Service not found
    }

    if (!service.ownerId.equals(req.user.id)) {
      return res.status(403).json({ error: "Forbidden" }); // Owner mismatch
    }

    // Update service details
    service.name = name;
    service.description = description;
    service.price = price;

    await service.save(); // Save updated service
    res.json(service); // Respond with updated service
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with bad request error
  }
});

// Delete a service
router.delete("/:id", authenticate, authorize("owner"), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id); // Find service by ID

    if (!service) {
      return res.status(404).json({ error: "Service not found" }); // Service not found
    }

    if (!service.ownerId.equals(req.user.id)) {
      return res.status(403).json({ error: "Forbidden" }); // Owner mismatch
    }

    await service.delete(); // Delete the service
    res.json({ message: "Service deleted" }); // Confirm deletion
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with internal server error
  }
});

module.exports = router;
