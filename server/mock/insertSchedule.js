const mongoose = require('mongoose');
const ExamSchedule = require('../models/ExamSchedule');

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/exam_seating');
};

const insertSchedule = async () => {
  await connectDB();
  const insertedSubjects = ['Maths', 'Physics', 'Chemistry', 'Biology', 'English'];

 const schedules = insertedSubjects.map((subjectDoc, i) => ({
  subject: subjectDoc._id, // ✅ correct ObjectId
  date: new Date(2025, 7, i + 10),
  time: '10:00 AM to 2:00 PM',
  semester: 1,
  department: "Computer Application"
}));

await ExamSchedule.insertMany(schedules);



  await ExamSchedule.insertMany(schedules);
  console.log('✅ Exam schedule inserted');
  mongoose.disconnect();
};

insertSchedule();
