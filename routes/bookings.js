const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { authenticate, authorize } = require("../middleware/auth");
const sendEmail = require("../utils/email");
const Customer = require("../models/Customer");
const Service = require("../models/Service");
const Owner = require("../models/Owner");

// Create a new booking by a customer
router.post("/", authenticate, authorize("customer"), async (req, res) => {
  const { serviceId, date, brand, model, year, licensePlate } = req.body;
  const customerId = req.user.id;

  try {
    // Find customer and service
    const customer = await Customer.findById(customerId);
    const service = await Service.findById(serviceId).populate(
      "ownerId",
      "name email ph"
    );

    if (!customer || !service)
      return res.status(404).json({ msg: "Customer or Service not found" });

    // Create and save the booking
    const booking = new Booking({
      customerId,
      ownerId: service.ownerId,
      serviceId,
      brand,
      model,
      year,
      licensePlate,
      date,
      status: "pending",
    });
    await booking.save();

    // Prepare email body with booking details
    const emailSubject = "New Booking Notification";
    const emailBody = `
      Dear ${service.ownerId.name},

      We are pleased to inform you that a new booking has been made for your service. Below are the details of the booking:

      Service Name: ${service.name}
      
      Customer Name: ${customer.name}
      Customer Email: ${customer.email}
      Customer Phone: ${customer.ph}
      
      Vehicle Information:
      - Brand: ${brand}
      - Model: ${model}
      - Year: ${year}
      - License Plate: ${licensePlate}
      
      Booking Date: ${date}

      Please review the booking details and contact the customer if you need any additional information.

      Thank you for your attention.
    `;

    // Send email notification to the service owner
    sendEmail(service.ownerId.email, emailSubject, emailBody);

    res.status(201).json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get all active booking for the authenticated customer
router.get(
  "/customer",
  authenticate,
  authorize("customer"),
  async (req, res) => {
    try {
      const booking = await Booking.find({
        customerId: req.user.id,
        status: { $ne: "completed" },
      })
        .populate([
          { path: "serviceId", select: "name" },
          { path: "customerId", select: "name" },
        ])
        .exec();
      if (!booking) {
        return res.status(404).json({ error: "No active booking found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all active bookings for the authenticated owner
router.get("/", authenticate, authorize("owner"), async (req, res) => {
  try {
    const bookings = await Booking.find({
      ownerId: req.user.id,
      status: { $ne: "completed" },
    })
      .populate([
        { path: "serviceId", select: "name" },
        { path: "customerId", select: "name" },
      ])
      .exec();
    if (!bookings) {
      return res.status(404).json({ error: "No active booking found" });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all completed bookings for the authenticated customer
router.get(
  "/customer/completed",
  authenticate,
  authorize("customer"),
  async (req, res) => {
    try {
      const bookings = await Booking.find({
        customerId: req.user.id,
        status: "completed",
      })
        .populate("customerId")
        .populate("serviceId");
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all completed bookings for the authenticated owner
router.get("/completed", authenticate, authorize("owner"), async (req, res) => {
  try {
    const bookings = await Booking.find({
      ownerId: req.user.id,
      status: "completed",
    })
      .populate([
        { path: "serviceId", select: "name" },
        { path: "customerId", select: "name" },
      ])
      .exec();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a booking status by authorized owner
router.put("/:id", authenticate, authorize("owner"), async (req, res) => {
  const { status } = req.body;
  try {
    // Find the booking by ID
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if the booking is already completed
    if (booking.status === "completed") {
      return res
        .status(400)
        .json({ error: "Booking is already completed and cannot be edited" });
    }

    // Ensure the status is being updated correctly
    if (status === "ready for delivery" && booking.status !== "pending") {
      return res
        .status(400)
        .json({
          error:
            'Booking status can only be updated to "ready for delivery" from "pending"',
        });
    }

    if (status === "completed" && booking.status !== "ready for delivery") {
      return res
        .status(400)
        .json({
          error:
            'Booking status can only be updated to "completed" from "ready for delivery"',
        });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    // If the status is 'ready for delivery', send an email notification to the customer
    if (status === "ready for delivery") {
      const customer = await Customer.findById(booking.customerId);
      if (customer) {
        const emailSubject = "Your Booking is Ready for Delivery";
        const emailBody = `
          Dear ${customer.name},

          We are pleased to inform you that your booking for the service "${booking.serviceId.name}" is now ready for delivery. Below are the details of your booking:

          Service Name: ${booking.serviceId.name}
          Vehicle Brand: ${booking.brand}
          Model: ${booking.model}
          Year: ${booking.year}
          License Plate: ${booking.licensePlate}
          Booking Date: ${booking.date}
          Current Status: Ready for Delivery

          Please arrange to pick up your vehicle at your earliest convenience. If you have any questions or need further assistance, feel free to contact us.

          Thank you for choosing our service.

          Best regards,
          ${booking.serviceId.ownerId.name}
          ${booking.serviceId.ownerId.phone}
        `;

        sendEmail(customer.email, emailSubject, emailBody);
      }
    }

    res.json({ message: "Booking updated", booking });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Mark a booking as completed by the owner
router.post(
  "/:id/complete",
  authenticate,
  authorize("owner"),
  async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: "completed" },
        { new: true }
      );
      if (!booking || booking.ownerId.toString() !== req.user.id) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Cancel a booking by the customer
router.delete("/:id", authenticate, authorize("customer"), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id).populate(
      "ownerId serviceId customerId"
    );
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Send email notification to the owner about cancellation
    const emailSubject = "Booking Cancellation Notification";
    const emailBody = `
      Dear ${booking.ownerId.name},

      We regret to inform you that a booking has been canceled. Below are the details of the canceled booking:

      Service Name: ${booking.serviceId.name}
      Customer Name: ${booking.customerId.name}
      Customer Email: ${booking.customerId.email}
      Customer Phone: ${booking.customerId.ph}
      
      Vehicle Information:
      - Brand: ${booking.brand}
      - Model: ${booking.model}
      - Year: ${booking.year}
      - License Plate: ${booking.licensePlate}
      
      Original Booking Date: ${booking.date}

      Please update your records accordingly.

      Thank you for your understanding.

      Best regards,
      [Your Company Name]
    `;

    sendEmail(booking.ownerId.email, emailSubject, emailBody);

    res.json({ message: "Booking canceled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
