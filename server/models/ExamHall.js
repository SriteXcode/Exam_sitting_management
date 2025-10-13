const mongoose = require('mongoose');

const examHallSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  location: String
});

module.exports = mongoose.model('ExamHall', examHallSchema);
