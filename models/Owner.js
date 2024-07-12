// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for an Owner
const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Owner's name (required)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, // Owner's email (must be unique, required, lowercase, and trimmed)
    ph: { type: String, required: true }, // Owner's phone number (required)
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Owner model based on the schema
module.exports = mongoose.model("Owner", ownerSchema);
