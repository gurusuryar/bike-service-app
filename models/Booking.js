const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'ready for delivery', 'completed'], default: 'pending' },
},
{ timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
