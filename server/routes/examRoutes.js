const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { createExam, getExams, getExamById, updateExam, deleteExam } = require('../controllers/examController');
const router = express.Router();

router.route('/').get(protect, getExams).post(protect, authorize('admin'), createExam);
router.route('/:id').get(protect, getExamById).put(protect, authorize('admin'), updateExam).delete(protect, authorize('admin'), deleteExam);

module.exports = router;