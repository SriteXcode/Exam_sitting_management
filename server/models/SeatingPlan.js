const mongoose = require('mongoose');

const seatingPlanSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  examSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamSchedule' },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamHall' },
  seatNumber: String
});

module.exports = mongoose.model('SeatingPlan', seatingPlanSchema);
