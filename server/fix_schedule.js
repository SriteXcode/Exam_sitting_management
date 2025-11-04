require('dotenv').config();
const mongoose = require('mongoose');
const ExamSchedule = require('./models/ExamSchedule');

// The ID of the schedule to fix.
const SCHEDULE_ID = '690516d2aab95d1c39e4f3f9';
// The semester number to add.
const SEMESTER = 3;

const fixSchedule = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in your .env file.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const schedule = await ExamSchedule.findById(SCHEDULE_ID);

    if (!schedule) {
      console.log(`Schedule with ID ${SCHEDULE_ID} not found.`);
      return;
    }

    if (schedule.semester) {
      console.log(`Schedule already has semester: ${schedule.semester}. No update needed.`);
    } else {
      schedule.semester = SEMESTER;
      await schedule.save();
      console.log(`Successfully added semester ${SEMESTER} to schedule ${SCHEDULE_ID}.`);
    }
  } catch (error) {
    console.error('Error updating schedule:', error);
  } finally {
    await mongoose.connection.close();
  }
};

fixSchedule();
