const express = require('express');
const router = express.Router();
const ExamSchedule = require('../models/ExamSchedule');

router.post('/add', async (req, res) => {
  const schedule = await ExamSchedule.create(req.body);
  res.status(201).json(schedule);
});

router.get('/', async (req, res) => {
  const schedules = await ExamSchedule.find().populate('subject');
  res.json(schedules);
});

router.get('/:id', async (req, res) => {
  const schedule = await ExamSchedule.findById(req.params.id).populate('subject');
  res.json(schedule);
});

router.put('/:id', async (req, res) => {
  const updated = await ExamSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await ExamSchedule.findByIdAndDelete(req.params.id);
  res.json({ message: 'Schedule deleted' });
});

module.exports = router;
