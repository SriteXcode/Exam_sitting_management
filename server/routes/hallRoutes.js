const express = require('express');
const router = express.Router();
const ExamHall = require('../models/ExamHall');

router.post('/add', async (req, res) => {
  const hall = await ExamHall.create(req.body);
  res.status(201).json(hall);
});

router.get('/', async (req, res) => {
  const halls = await ExamHall.find();
  res.json(halls);
});

router.get('/:id', async (req, res) => {
  const hall = await ExamHall.findById(req.params.id);
  res.json(hall);
});

router.put('/:id', async (req, res) => {
  const updated = await ExamHall.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await ExamHall.findByIdAndDelete(req.params.id);
  res.json({ message: 'Hall deleted' });
});

module.exports = router;
