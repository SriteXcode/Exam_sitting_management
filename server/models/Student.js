const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    enrollmentNo: {type: String, required: true, unique: true},
    rollNo: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    username: { type: String, required: true, unique: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    semester: {type:Number, required: true},
});

module.exports = mongoose.model('Student', studentSchema);
