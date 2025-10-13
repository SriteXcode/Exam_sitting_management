const mongoose = require('mongoose');
const Student = require('../models/Student'); // adjust if in different folder

const MONGO_URI = 'mongodb://localhost:27017/test'; // or your Atlas URI

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    const branches = ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT'];
    const subjects = ['Maths', 'Physics', 'Chemistry', 'Biology', 'English'];

    const students = Array.from({ length: 20 }, (_, i) => ({
      name: `Student ${i + 1}`,
      rollNo: `R${1000 + i}`, // ✅ must match schema
      branch: branches[i % branches.length],
      subject: subjects[i % subjects.length],
    }));

    const result = await Student.insertMany(students);
    console.log(`🎉 Inserted ${result.length} students`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error inserting students:', error.message);
  }
};

run();
