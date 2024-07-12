// Import the express framework for building web applications
const express = require("express");

// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Create an instance of the express application
const app = express();

// Connect to MongoDB using the connection string from environment variables
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
  })
  .then(() => console.log("Connected to MongoDB")) // Log a message if connection is successful
  .catch((err) => console.error("Error connecting to MongoDB:", err)); // Log an error message if connection fails

// Middleware to parse incoming JSON requests and make the data available in req.body
app.use(express.json());

// Import route handlers for different API endpoints
const usersRouter = require("./routes/users");
const ownersRouter = require("./routes/owners");
const customersRouter = require("./routes/customers");
const servicesRouter = require("./routes/services");
const bookingsRouter = require("./routes/bookings");

// Define the routes for the application, each using a different router module
app.use("/api/users", usersRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/customers", customersRouter);
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);

// Set the port number from environment variables or use 6000 as a default
const PORT = process.env.PORT || 6000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log a message indicating the server is running
});
