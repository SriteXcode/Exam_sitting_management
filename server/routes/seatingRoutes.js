const express = require('express');
const router = express.Router();
const SeatingPlan = require('../models/SeatingPlan');
const generateSeatingPlan = require('../algorithms/seatingGenerator');
const generatePrintableChart = require('../controllers/generatePrintableSeatingChart');
const reallocateSeat = require('../controllers/reallocateSeat');
const { generateSeatingPlanController } = require('../controllers/seatingController');

router.post('/add', async (req, res) => {
  const seat = await SeatingPlan.create(req.body);
  res.status(201).json(seat);
});

router.get('/', async (req, res) => {
  const seats = await SeatingPlan.find()
    .populate('student')
    .populate('examSchedule')
    .populate('hall');
  res.json(seats);
});

router.get('/:id', async (req, res) => {
  const seat = await SeatingPlan.findById(req.params.id)
    .populate('student')
    .populate('examSchedule')
    .populate('hall');
  res.json(seat);
});

router.put('/:id', async (req, res) => {
  const updated = await SeatingPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await SeatingPlan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Seating deleted' });
});

// POST /api/seating/generate/:scheduleId
router.post('/generate/:scheduleId', async (req, res) => {
  try {
    const result = await generateSeatingPlan(req.params.scheduleId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/hall/:hallId', async (req, res) => {
  try {
    const plan = await SeatingPlan.find({ hall: req.params.hallId })
      .populate('student')
      .populate({
        path: 'examSchedule',
        populate: { path: 'subject' }
      });

    const formatted = plan.map((p) => ({
      student: p.student.name,
      rollNo: p.student.rollNo,
      seatNumber: p.seatNumber,
      subject: p.examSchedule.subject.name
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/reassign/:studentId', async (req, res) => {
  const { newHallId, newSeatNumber } = req.body;

  try {
    const updated = await SeatingPlan.findOneAndUpdate(
      { student: req.params.studentId },
      {
        hall: newHallId,
        seatNumber: newSeatNumber
      },
      { new: true }
    )
    .populate('student')
    .populate('hall');

    res.json({
      message: `${updated.student.name} reassigned to ${updated.hall.name} - ${updated.seatNumber}`,
      updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Generate hall-wise printable chart
router.get('/chart/:scheduleId', async (req, res) => {
  try {
    const result = await generatePrintableChart(req.params.scheduleId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reallocate a student’s seat
router.post('/reallocate/:studentId/:scheduleId', async (req, res) => {
  try {
    const result = await reallocateSeat(req.params.studentId, req.params.scheduleId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/generate/:scheduleId', async (req, res) => {
  try {
    const result = await generateSeatingPlanController(req.params.scheduleId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
