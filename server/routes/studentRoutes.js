const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add a student
router.post('/add', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

module.exports = router;
