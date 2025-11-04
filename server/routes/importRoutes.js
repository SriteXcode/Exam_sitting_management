// const express = require('express');
// const multer = require('multer');
// const xlsx = require('xlsx');
// const Department = require('../models/Department');
// const Subject = require('../models/Subject');
// const Student = require('../models/Student');

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// const importData = async (Model, data) => {
//   await Model.insertMany(data, { ordered: false });
// };

// router.post('/students', async (req, res) => {
//   try {
//     await Student.insertMany(req.body, { ordered: false });
//     res.json({ message: 'Students imported successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error importing students' });
//   }
// });

// router.post('/subjects', async (req, res) => {
//   try {
//     await Subject.insertMany(req.body, { ordered: false });
//     res.json({ message: 'Subjects imported successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error importing subjects' });
//   }
// });

// router.post('/departments', async (req, res) => {
//   try {
//     await Department.insertMany(req.body, { ordered: false });
//     res.json({ message: 'Departments imported successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error importing departments' });
//   }
// });

// module.exports = router;




// const express = require('express');
// const Department = require('../models/Department');
// const Subject = require('../models/Subject');
// const Student = require('../models/Student');

// const router = express.Router();

// // --- Import Students ---
// router.post('/students', async (req, res) => {
//   try {
//     const students = req.body;
//     if (!Array.isArray(students) || students.length === 0) {
//       return res.status(400).json({ message: 'No student data received' });
//     }

//     // Validate required fields
//     const required = ["Name", "Student ID", "Enrollment No", "Roll No", "Department", "Username", "Semester"];
//     const missing = required.filter(field => !(field in students[0]));
//     if (missing.length) {
//       return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
//     }

//     // Map Excel fields → Schema fields
//     const formatted = students.map(s => ({
//       name: s["Name"],
//       studentId: s["Student ID"],
//       enrollmentNo: s["Enrollment No"],
//       rollNo: s["Roll No"],
//       username: s["Username"],
//       semester: s["Semester"],
//       department: s["Department"],
//       subjects: s["Subjects"] ? s["Subjects"].split(',').map(sub => sub.trim()) : []
//     }));

//     await Student.insertMany(formatted, { ordered: false });
//     res.json({ message: 'Students imported successfully!' });
//   } catch (error) {
//     console.error('Error importing students:', error);
//     res.status(500).json({ message: 'Error importing students' });
//   }
// });

// // --- Import Subjects ---
// router.post('/subjects', async (req, res) => {
//   try {
//     const subjects = req.body;
//     if (!Array.isArray(subjects) || subjects.length === 0) {
//       return res.status(400).json({ message: 'No subject data received' });
//     }

//     const formatted = subjects.map(s => ({
//       name: s["Name"],
//       code: s["Code"],
//       department: s["Department"]
//     }));

//     await Subject.insertMany(formatted, { ordered: false });
//     res.json({ message: 'Subjects imported successfully!' });
//   } catch (error) {
//     console.error('Error importing subjects:', error);
//     res.status(500).json({ message: 'Error importing subjects' });
//   }
// });

// // --- Import Departments ---
// router.post('/departments', async (req, res) => {
//   try {
//     const departments = req.body;
//     if (!Array.isArray(departments) || departments.length === 0) {
//       return res.status(400).json({ message: 'No department data received' });
//     }

//     const formatted = departments.map(d => ({
//       name: d["Department Name"]
//     }));

//     await Department.insertMany(formatted, { ordered: false });
//     res.json({ message: 'Departments imported successfully!' });
//   } catch (error) {
//     console.error('Error importing departments:', error);
//     res.status(500).json({ message: 'Error importing departments' });
//   }
// });

// module.exports = router;















const express = require('express');
const Department = require('../models/Department');
const Subject = require('../models/Subject');
const Student = require('../models/Student');

const router = express.Router();

/* ======================================================
   📘 IMPORT STUDENTS
   ====================================================== */


// router.post('/students', async (req, res) => {
//   try {
//     const students = req.body;
// console.log('📥 Students received:', students.length);
// console.log(students[0]);

//     if (!Array.isArray(students) || students.length === 0) {
//       return res.status(400).json({ message: 'No student data received.' });
//     }

//     const required = ["Name", "Student ID", "Enrollment No", "Roll No", "Department", "Username", "Semester"];
//     const missing = required.filter(field => !(field in students[0]));
//     if (missing.length) {
//       return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
//     }

//     // ✅ Normalize Department Names
//     const departmentNames = [...new Set(students.map(s => s["Department"].trim()))];
//     const existingDepartments = await Department.find({ name: { $in: departmentNames } });
//     const existingNames = existingDepartments.map(d => d.name);

//     const newDepartments = departmentNames
//       .filter(name => !existingNames.includes(name))
//       .map(name => ({ name }));

//     if (newDepartments.length > 0) {
//       await Department.insertMany(newDepartments);
//     }

//     const allDepartments = await Department.find({ name: { $in: departmentNames } });
//     const departmentMap = {};
//     allDepartments.forEach(d => (departmentMap[d.name] = d._id));

//     // ✅ Fetch all subjects for mapping
//     const allSubjects = await Subject.find({});
//     const subjectMap = {};
//     allSubjects.forEach(sub => (subjectMap[sub.name.trim()] = sub._id));

//     // ✅ Format Students
//     const formatted = students.map(s => ({
//       name: s["Name"].trim(),
//       studentId: s["Student ID"].trim(),
//       enrollmentNo: s["Enrollment No"].trim(),
//       rollNo: s["Roll No"].trim(),
//       username: s["Username"].trim(),
//       semester: Number(s["Semester"]),
//       department: departmentMap[s["Department"].trim()] || null,
//       subjects: s["Subjects"]
//         ? s["Subjects"]
//             .split(',')
//             .map(sub => sub.trim())
//             .filter(Boolean)
//             .map(subName => subjectMap[subName])
//             .filter(Boolean)
//         : []
//     }));

//     // ✅ Validate departments
//     const invalidDepts = formatted.filter(f => !f.department);
//     if (invalidDepts.length > 0) {
//       return res.status(400).json({
//         message: `Invalid departments found for ${invalidDepts.length} students. Please check department names.`,
//       });
//     }

//     // ✅ Prevent duplicates
//     const existing = await Student.find({
//       $or: [
//         { studentId: { $in: formatted.map(s => s.studentId) } },
//         { enrollmentNo: { $in: formatted.map(s => s.enrollmentNo) } },
//       ],
//     }).select('studentId enrollmentNo');

//     const existingIds = new Set(existing.map(s => s.studentId));
//     const existingEnrolls = new Set(existing.map(s => s.enrollmentNo));

//     const uniqueStudents = formatted.filter(
//       s => !existingIds.has(s.studentId) && !existingEnrolls.has(s.enrollmentNo)
//     );

//     if (uniqueStudents.length === 0) {
//       return res.json({ message: 'All students already exist. No new records added.' });
//     }

//     await Student.insertMany(uniqueStudents, { ordered: false });

//     res.json({
//       message: `✅ Students imported successfully! (${uniqueStudents.length} new, ${
//         formatted.length - uniqueStudents.length
//       } duplicates skipped)`
//     });
//   } catch (error) {
//     console.error('❌ Error importing students:', error);
//     res.status(500).json({ message: 'Error importing students.' });
//   }
// });

// --- Import Students ---
router.post('/students', async (req, res) => {
  try {
    const students = req.body;

    if (!Array.isArray(students)) {
      return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
    }

    let importedCount = 0;

    for (const s of students) {
      // 1️⃣ Find department by name
      const department = await Department.findOne({ name: s.Department.trim() });
      if (!department) {
        console.warn(`⚠️ Department not found: ${s.Department}`);
        continue; // Skip this student
      }

      // 2️⃣ Find subjects by names (split by comma)
      const subjectNames = s.Subjects
        ? s.Subjects.split(',').map(sub => sub.trim())
        : [];
      const subjectDocs = await Subject.find({
        name: { $in: subjectNames },
        department: department._id
      });
      const subjectIds = subjectDocs.map(sub => sub._id);

      // 3️⃣ Create student
      const newStudent = new Student({
        name: s.Name,
        studentId: s['Student ID'],
        enrollmentNo: s['Enrollment No'],
        rollNo: s['Roll No'],
        department: department._id,
        username: s.Username,
        semester: s.Semester,
        subjects: subjectIds
      });

      await newStudent.save();
      importedCount++;
    }

    res.status(201).json({
      message: `✅ Successfully imported ${importedCount} students!`
    });

  } catch (error) {
    console.error('❌ Import Error:', error);
    res.status(500).json({ error: error.message });
  }
});


/* ======================================================
   📘 IMPORT SUBJECTS
   ====================================================== */
router.post('/subjects', async (req, res) => {
  try {
    const subjects = req.body;

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: 'No subject data received.' });
    }

    const required = ["Name", "Code", "Department"];
    const missing = required.filter(field => !(field in subjects[0]));
    if (missing.length) {
      return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
    }

    // ✅ Ensure all departments exist
    const departmentNames = [...new Set(subjects.map(s => s["Department"]))];
    const existingDepartments = await Department.find({ name: { $in: departmentNames } });
    const existingNames = existingDepartments.map(d => d.name);

    const newDepartments = departmentNames
      .filter(name => !existingNames.includes(name))
      .map(name => ({ name }));

    if (newDepartments.length > 0) {
      await Department.insertMany(newDepartments);
    }

    const allDepartments = await Department.find({ name: { $in: departmentNames } });
    const departmentMap = {};
    allDepartments.forEach(d => (departmentMap[d.name] = d._id));

    // ✅ Prepare subjects
    const formatted = subjects.map(s => ({
      name: s["Name"],
      code: s["Code"],
      department: departmentMap[s["Department"]] || null
    }));

    // ✅ Prevent duplicates (by code)
    const existing = await Subject.find({
      code: { $in: formatted.map(s => s.code) }
    }).select('code');

    const existingCodes = new Set(existing.map(s => s.code));
    const uniqueSubjects = formatted.filter(s => !existingCodes.has(s.code));

    if (uniqueSubjects.length === 0) {
      return res.json({ message: 'All subjects already exist. No new records added.' });
    }

    await Subject.insertMany(uniqueSubjects, { ordered: false });
    res.json({
      message: `Subjects imported successfully! (${uniqueSubjects.length} new, ${formatted.length - uniqueSubjects.length} duplicates skipped)`
    });
  } catch (error) {
    console.error('Error importing subjects:', error);
    res.status(500).json({ message: 'Error importing subjects.' });
  }
});


// router.post('/students', async (req, res) => {
//   try {
//     const students = req.body;
// console.log('📥 Students received:', students.length);
// console.log(students[0]);

//     if (!Array.isArray(students) || students.length === 0) {
//       return res.status(400).json({ message: 'No student data received.' });
//     }

//     const required = ["Name", "Student ID", "Enrollment No", "Roll No", "Department", "Username", "Semester"];
//     const missing = required.filter(field => !(field in students[0]));
//     if (missing.length) {
//       return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
//     }

//     // ✅ Normalize Department Names
//     const departmentNames = [...new Set(students.map(s => s["Department"].trim()))];
//     const existingDepartments = await Department.find({ name: { $in: departmentNames } });
//     const existingNames = existingDepartments.map(d => d.name);

//     const newDepartments = departmentNames
//       .filter(name => !existingNames.includes(name))
//       .map(name => ({ name }));

//     if (newDepartments.length > 0) {
//       await Department.insertMany(newDepartments);
//     }

//     const allDepartments = await Department.find({ name: { $in: departmentNames } });
//     const departmentMap = {};
//     allDepartments.forEach(d => (departmentMap[d.name] = d._id));

//     // ✅ Fetch all subjects for mapping
//     const allSubjects = await Subject.find({});
//     const subjectMap = {};
//     allSubjects.forEach(sub => (subjectMap[sub.name.trim()] = sub._id));

//     // ✅ Format Students
//     const formatted = students.map(s => ({
//       name: s["Name"].trim(),
//       studentId: s["Student ID"].trim(),
//       enrollmentNo: s["Enrollment No"].trim(),
//       rollNo: s["Roll No"].trim(),
//       username: s["Username"].trim(),
//       semester: Number(s["Semester"]),
//       department: departmentMap[s["Department"].trim()] || null,
//       subjects: s["Subjects"]
//         ? s["Subjects"]
//             .split(',')
//             .map(sub => sub.trim())
//             .filter(Boolean)
//             .map(subName => subjectMap[subName])
//             .filter(Boolean)
//         : []
//     }));

//     // ✅ Validate departments
//     const invalidDepts = formatted.filter(f => !f.department);
//     if (invalidDepts.length > 0) {
//       return res.status(400).json({
//         message: `Invalid departments found for ${invalidDepts.length} students. Please check department names.`,
//       });
//     }

//     // ✅ Prevent duplicates
//     const existing = await Student.find({
//       $or: [
//         { studentId: { $in: formatted.map(s => s.studentId) } },
//         { enrollmentNo: { $in: formatted.map(s => s.enrollmentNo) } },
//       ],
//     }).select('studentId enrollmentNo');

//     const existingIds = new Set(existing.map(s => s.studentId));
//     const existingEnrolls = new Set(existing.map(s => s.enrollmentNo));

//     const uniqueStudents = formatted.filter(
//       s => !existingIds.has(s.studentId) && !existingEnrolls.has(s.enrollmentNo)
//     );

//     if (uniqueStudents.length === 0) {
//       return res.json({ message: 'All students already exist. No new records added.' });
//     }

//     await Student.insertMany(uniqueStudents, { ordered: false });

//     res.json({
//       message: `✅ Students imported successfully! (${uniqueStudents.length} new, ${
//         formatted.length - uniqueStudents.length
//       } duplicates skipped)`
//     });
//   } catch (error) {
//     console.error('❌ Error importing students:', error);
//     res.status(500).json({ message: 'Error importing students.' });
//   }
// });

/* ======================================================
   📘 IMPORT DEPARTMENTS
   ====================================================== */
router.post('/departments', async (req, res) => {
  try {
    const departments = req.body;

    if (!Array.isArray(departments) || departments.length === 0) {
      return res.status(400).json({ message: 'No department data received.' });
    }

    const required = ["Department Name"];
    const missing = required.filter(field => !(field in departments[0]));
    if (missing.length) {
      return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
    }

    const formatted = departments.map(d => ({
      name: d["Department Name"]
    }));

    // ✅ Prevent duplicates
    const existing = await Department.find({
      name: { $in: formatted.map(d => d.name) }
    }).select('name');

    const existingNames = new Set(existing.map(d => d.name));
    const uniqueDepartments = formatted.filter(d => !existingNames.has(d.name));

    if (uniqueDepartments.length === 0) {
      return res.json({ message: 'All departments already exist. No new records added.' });
    }

    await Department.insertMany(uniqueDepartments, { ordered: false });
    res.json({
      message: `Departments imported successfully! (${uniqueDepartments.length} new, ${formatted.length - uniqueDepartments.length} duplicates skipped)`
    });
  } catch (error) {
    console.error('Error importing departments:', error);
    res.status(500).json({ message: 'Error importing departments.' });
  }
});

module.exports = router;
