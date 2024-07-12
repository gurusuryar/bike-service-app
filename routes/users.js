// Import necessary modules and libraries
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Owner = require("../models/Owner");
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate, authorize } = require("../middleware/auth");
require("dotenv").config();

/**
 * Generate a JSON Web Token for authentication.
 *
 * @param {Object} payload - The payload to encode in the token.
 * @returns {string} - The generated token.
 */
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
}

// User registration route (Role: Owner or Customer)
router.post("/register", async (req, res) => {
  const { email, password, role, name, ph } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    let entity;
    if (role === "owner") {
      // Create a new User document
      const user = new User({
        email,
        password: hashedPassword,
        role,
        name,
        ph,
      });
      await user.save();

      // Create a new Owner document
      entity = new Owner({ _id: user._id, name, email, ph });
      await entity.save();

      // Generate a token for the new user
      const token = generateToken({ userId: user._id, role: user.role });
      res.status(201).json({ token, role: user.role });
    } else {
      // Create a new User document
      const user = new User({
        email,
        password: hashedPassword,
        role,
        name,
        ph,
      });
      await user.save();

      // Create a new Customer document
      entity = new Customer({ _id: user._id, name, email, ph });
      await entity.save();

      // Generate a token for the new user
      const token = generateToken({ userId: user._id, role: user.role });
      res.status(201).json({ token, role: user.role });
    }
  } catch (error) {
    // Handle any errors that occur during registration
    res.status(400).json({ error: error.message });
  }
});

// User login route (Role: Owner or Customer)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "New User Sign up first.." });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a token for the authenticated user
    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    // Handle any errors that occur during login
    res.status(500).json({ error: error.message });
  }
});

// Fetch details of the currently authenticated user
router.get("/me", authenticate, async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);
    let entity;

    // Fetch the corresponding entity (Owner or Customer) based on the user's role
    if (user.role === "owner") {
      entity = await Owner.findById(user.id);
    } else {
      entity = await Customer.findById(user.id);
    }

    // Return the entity details
    res.json(entity);
  } catch (error) {
    // Handle any errors that occur while fetching user details
    res.status(500).json({ error: error.message });
  }
});

// Export the router to be used in the main application
module.exports = router;
