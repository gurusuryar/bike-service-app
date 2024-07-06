const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
const usersRouter = require('./routes/users');
const ownersRouter = require('./routes/owners');
const customersRouter = require('./routes/customers');
const servicesRouter = require('./routes/services');
const bookingsRouter = require('./routes/bookings');

app.use('/api/users', usersRouter);
app.use('/api/owners', ownersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
