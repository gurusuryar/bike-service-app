// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for a Booking
const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Reference to the Customer model
    required: true, // Customer ID is required
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner", // Reference to the Owner model
    required: true, // Owner ID is required
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service", // Reference to the Service model
    required: true, // Service ID is required
  },
  brand: {
    type: String,
    required: true, // Vehicle brand is required
  },
  model: {
    type: String,
    required: true, // Vehicle model is required
  },
  year: {
    type: Number,
    required: true, // Vehicle year is required
  },
  licensePlate: {
    type: String,
    required: true, // Vehicle license plate is required
  },
  date: {
    type: Date,
    required: true, // Booking date is required
  },
  status: {
    type: String,
    enum: ["pending", "ready for delivery", "completed"], // Status options for the booking
    default: "pending", // Default status is 'pending'
  },
},
{ timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Booking model based on the schema
module.exports = mongoose.model("Booking", bookingSchema);
