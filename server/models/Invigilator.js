const mongoose = require('mongoose');

const invigilatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: {type: String},
  department: String,
  availableDates: [String] // e.g. ["2025-08-10", "2025-08-11"]
});

module.exports = mongoose.model('Invigilator', invigilatorSchema);
