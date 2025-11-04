const SeatingPlan = require('../models/SeatingPlan');
const Student = require('../models/Student');
const ExamSchedule = require('../models/ExamSchedule');
const ExamHall = require('../models/ExamHall');

// Helper function to interleave students
const interleaveStudents = (students, isMulti = false) => {
  const groupBySubject = {};
  for (const item of students) {
    const student = isMulti ? item.student : item;
    for (const subject of student.subjects) {
      if (!groupBySubject[subject]) {
        groupBySubject[subject] = [];
      }
      groupBySubject[subject].push(item);
    }
  }

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
  return interleaved;
};

// --- SINGLE SCHEDULE GENERATOR ---
const generateSeatingPlan = async (scheduleId) => {
  try {
    const schedule = await ExamSchedule.findById(scheduleId).populate({
      path: 'subject',
      populate: { path: 'department' },
    });

    if (!schedule || !schedule.subject || !schedule.subject.department) {
      throw new Error('Could not find department for the given schedule.');
    }

    const department = schedule.subject.department;

    const students = await Student.find({
      semester: schedule.semester,
      department: department._id,
      subjects: schedule.subject._id,
    });

    console.log(`Found ${students.length} students for schedule ${scheduleId}`);

    const halls = await ExamHall.find();
    const totalSeats = halls.reduce((acc, h) => acc + h.capacity, 0);

    if (students.length > totalSeats) {
      throw new Error('Not enough hall capacity for all students.');
    }

    const interleaved = interleaveStudents(students);

    const plan = [];
    let hallIndex = 0;
    let seatCounter = 1;

    for (const student of interleaved) {
      const hall = halls[hallIndex];
      const currentHallSeats = plan.filter((p) => p.hall.toString() === hall._id.toString()).length;

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
        seatNumber: `Seat-${seatCounter++}`,
      });
    }

    await SeatingPlan.insertMany(plan);
    return { message: 'Seating plan generated successfully!', count: plan.length };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// --- MULTIPLE SCHEDULE GENERATOR ---
const generateMultipleSeatingPlans = async (scheduleIds) => {
  try {
    const schedules = await ExamSchedule.find({ _id: { $in: scheduleIds } }).populate({
      path: 'subject',
      populate: { path: 'department' },
    });

    if (!schedules || schedules.length === 0) {
      throw new Error('No valid schedules found.');
    }

    let studentsWithSchedules = [];
    for (const schedule of schedules) {
      if (!schedule.subject || !schedule.subject.department) {
        console.warn(`Skipping schedule ${schedule._id} due to missing subject or department information.`);
        continue;
      }
      const department = schedule.subject.department;
      const students = await Student.find({
        semester: schedule.semester,
        department: department._id,
        subjects: schedule.subject._id,
      });
      for (const student of students) {
        studentsWithSchedules.push({ student, schedule });
      }
    }

    console.log(`Found ${studentsWithSchedules.length} students in total.`);

    const halls = await ExamHall.find();
    const totalSeats = halls.reduce((acc, h) => acc + h.capacity, 0);

    if (studentsWithSchedules.length > totalSeats) {
      throw new Error('Not enough hall capacity for all students.');
    }

    const interleaved = interleaveStudents(studentsWithSchedules, true);

    const plan = [];
    let hallIndex = 0;
    let seatCounter = 1;

    for (const item of interleaved) {
      const hall = halls[hallIndex];
      const currentHallSeats = plan.filter((p) => p.hall.toString() === hall._id.toString()).length;

      if (currentHallSeats >= hall.capacity) {
        hallIndex++;
        seatCounter = 1;
        if (hallIndex >= halls.length) {
          throw new Error('Ran out of halls unexpectedly.');
        }
      }

      plan.push({
        student: item.student._id,
        examSchedule: item.schedule._id,
        hall: halls[hallIndex]._id,
        seatNumber: `Seat-${seatCounter++}`,
      });
    }

    await SeatingPlan.insertMany(plan);
    return { message: 'Seating plan generated successfully!', count: plan.length };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { generateSeatingPlan, generateMultipleSeatingPlans };