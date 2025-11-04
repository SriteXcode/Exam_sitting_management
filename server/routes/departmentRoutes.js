const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const Department = require('../models/Department');
const router = express.Router();

// Get all departments
router.get('/', protect, async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
});

// Add a new department  
router.post('/', protect, authorize('admin'), async (req, res) => {
    const { name } = req.body;
    const department = new Department({ name });
    await department.save();
    res.status(201).json(department);
});

// Update a department
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    const { name } = req.body;
    const department = await Department.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(department);
});

// Delete a department
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted successfully' });
});

module.exports = router;