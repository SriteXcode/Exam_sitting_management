// const xlsx = require('xlsx');
// const Student = require('../models/Student');
// const Department = require('../models/Department');

// const importStudents = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     try {
//         const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const studentsData = xlsx.utils.sheet_to_json(worksheet);

//         for (const student of studentsData) {
//             const { name, department, rollno, enrollment_no } = student;
//             if (!name || !department || !rollno || !enrollment_no) {
//                 return res.status(400).json({ message: 'Missing required fields in the Excel file.' });
//             }

//             const existingStudent = await Student.findOne({ $or: [{ studentId: rollno }, { enrollmentNo: enrollment_no }] });
//             if (existingStudent) {
//                 return res.status(400).json({ message: `Student with roll number ${rollno} or enrollment number ${enrollment_no} already exists.` });
//             }
//         }

//         const departmentNames = [...new Set(studentsData.map(student => student.department))];
//         for (const departmentName of departmentNames) {
//             let departmentDoc = await Department.findOne({ name: departmentName });
//             if (!departmentDoc) {
//                 await Department.create({ name: departmentName });
//             }
//         }

//         const students = await Promise.all(studentsData.map(async (student) => {
//             const { name, department, rollno, enrollment_no } = student;

//             const departmentDoc = await Department.findOne({ name: department });

//             const now = new Date();
//             const month = (now.getMonth() + 1).toString().padStart(2, '0');
//             const year = now.getFullYear();
//             const username = `EXAM$${month}$${year}$${rollno}`;

//             return {
//                 name,
//                 studentId: rollno, // Assuming rollno is the studentId
//                 enrollmentNo: enrollment_no,
//                 rollNo: rollno,
//                 department: departmentDoc._id,
//                 username
//             };
//         }));

//         await Student.insertMany(students);

//         res.status(201).json({ message: 'Students imported successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { importStudents };















const xlsx = require('xlsx');
const Student = require('../models/Student');
const Department = require('../models/Department');

const importStudents = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Read and convert Excel
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const studentsData = xlsx.utils.sheet_to_json(worksheet);

    if (!studentsData.length) {
      return res.status(400).json({ message: 'The uploaded file is empty.' });
    }

    // Normalize column names (handles spaces, casing)
    const normalizedData = studentsData.map((row) => {
      const obj = {};
      for (const key in row) {
        obj[key.trim().toLowerCase().replace(/\s+/g, '_')] = row[key];
      }
      return obj;
    });

    // Validate data
    const invalidRows = normalizedData.filter(
      (s) =>
        !s.name ||
        !s.department ||
        !s.roll_no ||
        !s.enrollment_no
    );

    if (invalidRows.length) {
      return res.status(400).json({
        message: `${invalidRows.length} invalid rows found (missing required fields).`,
      });
    }

    // Ensure all departments exist
    const departmentNames = [
      ...new Set(normalizedData.map((s) => s.department)),
    ];
    for (const departmentName of departmentNames) {
      let dept = await Department.findOne({ name: departmentName });
      if (!dept) {
        await Department.create({ name: departmentName });
      }
    }

    // Build student objects
    const students = await Promise.all(
      normalizedData.map(async (student) => {
        const { name, department, roll_no, enrollment_no } = student;
        const departmentDoc = await Department.findOne({ name: department });

        // Skip if department not found (edge case)
        if (!departmentDoc) return null;

        const now = new Date();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const username = `EXAM$${month}$${year}$${roll_no}`;

        return {
          name,
          studentId: roll_no,
          enrollmentNo: enrollment_no,
          rollNo: roll_no,
          department: departmentDoc._id,
          username,
        };
      })
    );

    const validStudents = students.filter(Boolean);

    if (!validStudents.length) {
      return res.status(400).json({ message: 'No valid students to import.' });
    }

    // Check duplicates before insert
    const duplicate = await Student.findOne({
      $or: [
        { studentId: { $in: validStudents.map((s) => s.studentId) } },
        { enrollmentNo: { $in: validStudents.map((s) => s.enrollmentNo) } },
      ],
    });

    if (duplicate) {
      return res.status(400).json({
        message: `Duplicate found: Roll No ${duplicate.studentId} or Enrollment No ${duplicate.enrollmentNo}`,
      });
    }

    // Insert into DB
    await Student.insertMany(validStudents);

    res.status(201).json({
      message: `Successfully imported ${validStudents.length} students.`,
    });
  } catch (error) {
    console.error('Import Error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { importStudents };
