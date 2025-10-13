const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  enrollmentNo: {type: String, required: true, unique: true},
  department: { type: String },
  semester: { type: Number },
  subjects: [{ type: String }]
});

module.exports = mongoose.model('Student', studentSchema);
