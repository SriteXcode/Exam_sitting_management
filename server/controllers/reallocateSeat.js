const SeatingPlan = require('../models/SeatingPlan');
const Student = require('../models/Student');

const reallocateSeat = async (studentId, examScheduleId) => {
  try {
    // Remove old plan
    const removed = await SeatingPlan.findOneAndDelete({ student: studentId, examSchedule: examScheduleId });
    if (!removed) throw new Error("Student not found in seating plan.");

    // Find unallocated students
    const allocatedStudents = await SeatingPlan.find({ examSchedule: examScheduleId }).distinct('student');
    const unallocated = await Student.find({
      _id: { $nin: allocatedStudents }
    });

    if (!unallocated.length) return { message: 'No unallocated students available for reallocation.' };

    const replacement = unallocated[0];

    // Assign replacement to the same seat
    await SeatingPlan.create({
      student: replacement._id,
      examSchedule: removed.examSchedule,
      hall: removed.hall,
      seatNumber: removed.seatNumber
    });

    return {
      message: 'Seat reallocated successfully.',
      replacedWith: replacement.name
    };

  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = reallocateSeat;
