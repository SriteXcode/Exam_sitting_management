const express = require('express');
const router = express.Router();
const Invigilator = require('../models/Invigilator');

router.post('/add', async (req, res) => {
  const invigilator = await Invigilator.create(req.body);
  res.status(201).json(invigilator);
});

router.get('/', async (req, res) => {
  const invigilators = await Invigilator.find();
  res.json(invigilators);
});

router.get('/:id', async (req, res) => {
  const invigilator = await Invigilator.findById(req.params.id);
  res.json(invigilator);
});

router.put('/:id', async (req, res) => {
  const updated = await Invigilator.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Invigilator.findByIdAndDelete(req.params.id);
  res.json({ message: 'Invigilator deleted' });
});

module.exports = router;
