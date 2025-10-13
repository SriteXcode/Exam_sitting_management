const SeatingPlan = require('../models/SeatingPlan');
const Student = require('../models/Student');
const ExamSchedule = require('../models/ExamSchedule');
const ExamHall = require('../models/ExamHall');

/**
 * Generate Seating Plan with subject-based interleaving
 */
const generateSeatingPlanController = async (scheduleId) => {
  try {
    const schedule = await ExamSchedule.findById(scheduleId).populate('subject');
    if (!schedule) throw new Error('Schedule not found.');

    const students = await Student.find({
      semester: schedule.semester,
      department: schedule.department,
      subjects: schedule.subject.name
    });

    const halls = await ExamHall.find();
    const totalSeats = halls.reduce((acc, h) => acc + h.capacity, 0);

    if (students.length > totalSeats) {
      throw new Error('Not enough hall capacity for all students.');
    }

    // Step 1: Group students by subject
    const groupBySubject = {};
    for (const student of students) {
      for (const subject of student.subjects) {
        if (!groupBySubject[subject]) groupBySubject[subject] = [];
        groupBySubject[subject].push(student);
      }
    }

    // Step 2: Interleave students from different subjects
    const interleaved = [];
    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      for (let subject in groupBySubject) {
        if (groupBySubject[subject].length) {
          interleaved.push(groupBySubject[subject].pop());
          keepGoing = true;
        }
      }
    }

    // Step 3: Allocate to halls
    let hallIndex = 0;
    let seatCounter = 1;
    const plan = [];

    for (const student of interleaved) {
      const hall = halls[hallIndex];
      const currentHallSeats = plan.filter(p => p.hall.toString() === hall._id.toString()).length;

      if (currentHallSeats >= hall.capacity) {
        hallIndex++;
        seatCounter = 1;
        if (hallIndex >= halls.length) {
          throw new Error('Ran out of halls unexpectedly.');
        }
      }

      plan.push({
        student: student._id,
        examSchedule: schedule._id,
        hall: halls[hallIndex]._id,
        seatNumber: `Seat-${seatCounter++}`
      });
    }

    await SeatingPlan.insertMany(plan);

    return { message: 'Seating plan generated successfully!', count: plan.length };

  } catch (err) {
    console.error('Error generating seating plan:', err.message);
    throw err;
  }
};

module.exports = { generateSeatingPlanController };
