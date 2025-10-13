const mongoose = require('mongoose');
const ExamHall = require('../models/ExamHall');

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/test');
};

const insertHalls = async () => {
  await connectDB();
  const halls = Array.from({ length: 5 }, (_, i) => ({
    name: `Hall-${i + 1}`,
    capacity: 30 + i * 10, // 30, 40, 50...
  }));

  await ExamHall.insertMany(halls);
  console.log('✅ Exam halls inserted');
  mongoose.disconnect();
};

insertHalls();
