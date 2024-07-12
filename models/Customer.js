// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for a Customer
const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Customer's name (required)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, // Customer's email (must be unique, required, lowercase, and trimmed)
    ph: { type: String, required: true }, // Customer's phone number (required)
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Customer model based on the schema
module.exports = mongoose.model("Customer", customerSchema);
