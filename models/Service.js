// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for a Service
const serviceSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner", // Reference to the Owner model
    },
    name: {
      type: String,
      required: true, // Service name is required
    },
    description: {
      type: String,
      required: true, // Service description is required
    },
    price: {
      type: Number,
      required: true, // Service price is required
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Service model based on the schema
module.exports = mongoose.model("Service", serviceSchema);
