const xlsx = require('xlsx');
const Student = require('../models/Student');
const Department = require('../models/Department');

const importStudents = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const studentsData = xlsx.utils.sheet_to_json(worksheet);

        for (const student of studentsData) {
            const { name, department, rollno, enrollment_no } = student;
            if (!name || !department || !rollno || !enrollment_no) {
                return res.status(400).json({ message: 'Missing required fields in the Excel file.' });
            }

            const existingStudent = await Student.findOne({ $or: [{ studentId: rollno }, { enrollmentNo: enrollment_no }] });
            if (existingStudent) {
                return res.status(400).json({ message: `Student with roll number ${rollno} or enrollment number ${enrollment_no} already exists.` });
            }
        }

        const departmentNames = [...new Set(studentsData.map(student => student.department))];
        for (const departmentName of departmentNames) {
            let departmentDoc = await Department.findOne({ name: departmentName });
            if (!departmentDoc) {
                await Department.create({ name: departmentName });
            }
        }

        const students = await Promise.all(studentsData.map(async (student) => {
            const { name, department, rollno, enrollment_no } = student;

            const departmentDoc = await Department.findOne({ name: department });

            const now = new Date();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const year = now.getFullYear();
            const username = `EXAM$${month}$${year}$${rollno}`;

            return {
                name,
                studentId: rollno, // Assuming rollno is the studentId
                enrollmentNo: enrollment_no,
                rollNo: rollno,
                department: departmentDoc._id,
                username
            };
        }));

        await Student.insertMany(students);

        res.status(201).json({ message: 'Students imported successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { importStudents };
