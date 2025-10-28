const express = require('express');
const multer = require('multer');
const { importStudents } = require('../controllers/importController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protect, authorize('admin'), upload.single('file'), importStudents);

module.exports = router;