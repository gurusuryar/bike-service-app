// Import the jsonwebtoken library for handling JWT tokens
const jwt = require("jsonwebtoken");

// Import the User model to interact with the user collection in the database
const User = require("../models/User");

/**
 * Middleware to authenticate the user using JWT.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to be sent to the client.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header (format: "Bearer <token>")
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token using the JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token's userId
    const user = await User.findById(decoded.userId);

    // If the user is not found, return an unauthorized error
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach the user object to the request for use in subsequent middleware/functions
    req.user = user;

    // Proceed to the next middleware function
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      // Invalid token error
      return res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      // Token expired error
      return res.status(401).json({ error: "Token expired" });
    } else {
      // Handle any other server errors
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * Middleware to authorize the user based on their role.
 *
 * @param {string} role - The required role to access the resource.
 * @returns {Function} - The middleware function that checks the user's role.
 */
const authorize = (role) => {
  return (req, res, next) => {
    // Check if the user's role matches the required role
    if (req.user.role !== role) {
      // If the user does not have the required role, return a forbidden error
      return res.status(403).json({ error: "Forbidden" });
    }

    // Proceed to the next middleware function
    next();
  };
};

// Export the authenticate and authorize middleware functions for use in other parts of the application
module.exports = { authenticate, authorize };
