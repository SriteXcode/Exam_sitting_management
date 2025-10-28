const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    shifts: [{
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExamHall' }],
    invigilators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invigilator' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exam', examSchema);