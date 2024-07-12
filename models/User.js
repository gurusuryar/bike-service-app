// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for a User
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, // User's email (must be unique, required, lowercase, and trimmed)
    password: { type: String, required: true }, // User's password (required)
    role: { type: String, enum: ["owner", "customer"], required: true }, // User's role (must be either 'owner' or 'customer' and required)
    entity: { type: mongoose.Schema.Types.ObjectId, refPath: "role" }, // Reference to either an Owner or Customer based on role
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
