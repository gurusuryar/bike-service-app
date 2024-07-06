const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true,lowercase: true, trim: true },
  ph: { type: String, required: true },
},
{ timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
