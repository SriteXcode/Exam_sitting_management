const mongoose = require('mongoose');

const examScheduleSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  semester: Number,
  department: String
});

module.exports = mongoose.model('ExamSchedule', examScheduleSchema);
