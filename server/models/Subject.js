const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: String,
  semester: Number
});

module.exports = mongoose.model('Subject', subjectSchema);
