const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
},
{ timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
