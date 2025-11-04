
// import React, { useState } from 'react';
// import { useStudent } from '../contexts/StudentContext';
// import { useDepartment } from '../contexts/DepartmentContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from '@mui/material';

// const StudentManagement = () => {
//   const { students, addStudent } = useStudent();
//   const { departments } = useDepartment();
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: '', rollNo: '', department: '' });

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setFormData({ name: '', rollNo: '', department: '' });
//   };

//   const handleSave = async () => {
//     await addStudent(formData);
//     handleClose();
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Student Management
//       </Typography>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Student
//       </Button>
//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Roll No</TableCell>
//               <TableCell>Department</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.map((student) => (
//               <TableRow key={student._id}>
//                 <TableCell>{student.name}</TableCell>
//                 <TableCell>{student.rollNo}</TableCell>
//                 <TableCell>{departments.find(d => d._id === student.department)?.name}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add Student</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Student Name"
//             name="name"
//             type="text"
//             fullWidth
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Roll No"
//             name="rollNo"
//             type="text"
//             fullWidth
//             value={formData.rollNo}
//             onChange={handleChange}
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Department</InputLabel>
//             <Select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//             >
//               {departments.map((department) => (
//                 <MenuItem key={department._id} value={department._id}>
//                   {department.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default StudentManagement;



// import React, { useState } from 'react';
// import { useStudent } from '../contexts/StudentContext';
// import { useDepartment } from '../contexts/DepartmentContext';
// import { useSubject } from '../contexts/SubjectContext'; // new import
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Alert,
//   CircularProgress,
//   Box,
//   OutlinedInput,
//   Chip,
// } from '@mui/material';

// const StudentManagement = () => {
//   const { students, addStudent, loading, error } = useStudent();
//   const { departments } = useDepartment();
//   const { subjects } = useSubject(); // subject list from context
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     studentId: '',
//     enrollmentNo: '',
//     rollNo: '',
//     department: '',
//     username: '',
//     subjects: [],
//     semester: '',
//   });
//   const [formError, setFormError] = useState('');

//   const handleOpen = () => setOpen(true);

//   const handleClose = () => {
//     setOpen(false);
//     setFormData({
//       name: '',
//       studentId: '',
//       enrollmentNo: '',
//       rollNo: '',
//       department: '',
//       username: '',
//       subjects: [],
//       semester: '',
//     });
//     setFormError('');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubjectsChange = (e) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       subjects: typeof value === 'string' ? value.split(',') : value,
//     }));
//   };

//   const handleSave = async () => {
//     // basic validation
//     if (
//       !formData.name.trim() ||
//       !formData.studentId.trim() ||
//       !formData.enrollmentNo.trim() ||
//       !formData.rollNo.trim() ||
//       !formData.department ||
//       !formData.username.trim() ||
//       !formData.semester
//     ) {
//       setFormError('Please fill all required fields.');
//       return;
//     }

//     await addStudent(formData);
//     handleClose();
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Student Management
//       </Typography>

//       {error && <Alert severity="error">{error}</Alert>}

//       <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 1 }}>
//         Add Student
//       </Button>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Student ID</TableCell>
//                 <TableCell>Enrollment No</TableCell>
//                 <TableCell>Roll No</TableCell>
//                 <TableCell>Username</TableCell>
//                 <TableCell>Semester</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Subjects</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.length > 0 ? (
//                 students.map((student) => (
//                   <TableRow key={student._id}>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.studentId}</TableCell>
//                     <TableCell>{student.enrollmentNo}</TableCell>
//                     <TableCell>{student.rollNo}</TableCell>
//                     <TableCell>{student.username}</TableCell>
//                     <TableCell>{student.semester}</TableCell>
//                     <TableCell>
//                       {departments.find((d) => d._id === student.department)?.name || 'Unknown'}
//                     </TableCell>
//                     <TableCell>
//                       {(student.subjects || [])
//                         .map((sId) => subjects.find((s) => s._id === sId)?.name)
//                         .filter(Boolean)
//                         .join(', ')}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">
//                     No students found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add Student</DialogTitle>
//         <DialogContent>
//           {formError && <Alert severity="warning" sx={{ mb: 2 }}>{formError}</Alert>}

//           <TextField
//             autoFocus
//             margin="dense"
//             label="Student Name"
//             name="name"
//             type="text"
//             fullWidth
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Student ID"
//             name="studentId"
//             type="text"
//             fullWidth
//             value={formData.studentId}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Enrollment No"
//             name="enrollmentNo"
//             type="text"
//             fullWidth
//             value={formData.enrollmentNo}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Roll No"
//             name="rollNo"
//             type="text"
//             fullWidth
//             value={formData.rollNo}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Username"
//             name="username"
//             type="text"
//             fullWidth
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Semester"
//             name="semester"
//             type="number"
//             fullWidth
//             value={formData.semester}
//             onChange={handleChange}
//           />

//           <FormControl fullWidth margin="dense">
//             <InputLabel>Department</InputLabel>
//             <Select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//             >
//               {departments.map((department) => (
//                 <MenuItem key={department._id} value={department._id}>
//                   {department.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth margin="dense">
//             <InputLabel>Subjects</InputLabel>
//             <Select
//               multiple
//               name="subjects"
//               value={formData.subjects}
//               onChange={handleSubjectsChange}
//               input={<OutlinedInput label="Subjects" />}
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                   {selected.map((value) => {
//                     const subject = subjects.find((s) => s._id === value);
//                     return <Chip key={value} label={subject ? subject.name : value} />;
//                   })}
//                 </Box>
//               )}
//             >
//               {subjects.map((subject) => (
//                 <MenuItem key={subject._id} value={subject._id}>
//                   {subject.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave} disabled={loading}>
//             {loading ? <CircularProgress size={20} /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default StudentManagement;








import React, { useState } from 'react';
import { useStudent } from '../contexts/StudentContext';
import { useDepartment } from '../contexts/DepartmentContext';
import { useSubject } from '../contexts/SubjectContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';

const StudentManagement = () => {
  const { students, addStudent, loading, error } = useStudent();
  const { departments } = useDepartment();
  const { subjects } = useSubject();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    enrollmentNo: '',
    rollNo: '',
    department: '',
    username: '',
    semester: '',
    subjects: [],
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      studentId: '',
      enrollmentNo: '',
      rollNo: '',
      department: '',
      username: '',
      semester: '',
      subjects: [],
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      subjects: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSave = async () => {
    // ✅ Frontend validation
    const requiredFields = [
      'name',
      'studentId',
      'enrollmentNo',
      'rollNo',
      'department',
      'username',
      'semester',
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }
    if (formData.subjects.length === 0) {
      alert('Please select at least one subject.');
      return;
    }

    await addStudent(formData);
    handleClose();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom color="error">
        Student Management
      </Typography>

      <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={handleOpen}>
        Add Student
      </Button>

      {loading && <CircularProgress sx={{ ml: 2 }} />}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#ffebee' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Enrollment No</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Subjects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.enrollmentNo}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.username}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell>
                  {departments.find((d) => d._id === student.department)?.name || 'N/A'}
                </TableCell>
                <TableCell>
                  {student.subjects
                    .map((s) => subjects.find((sub) => sub._id === s)?.name)
                    .filter(Boolean)
                    .join(', ') || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Student Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'red' }}>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Student ID"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enrollment No"
            name="enrollmentNo"
            value={formData.enrollmentNo}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Roll No"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Semester"
            name="semester"
            type="number"
            value={formData.semester}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          {/* Department Select */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              input={<OutlinedInput label="Department" />}
            >
              {departments.map((dept) => (
                <MenuItem key={dept._id} value={dept._id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Multi Subject Select */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Subjects</InputLabel>
            <Select
              multiple
              value={formData.subjects}
              onChange={handleSubjectChange}
              input={<OutlinedInput label="Subjects" />}
              renderValue={(selected) =>
                subjects
                  .filter((s) => selected.includes(s._id))
                  .map((s) => s.name)
                  .join(', ')
              }
            >
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  <Checkbox checked={formData.subjects.includes(subject._id)} />
                  <ListItemText primary={subject.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#b71c1c' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
