const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// CREATE
router.post('/add', async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.json(subject);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: 'Subject deleted' });
});

module.exports = router;
