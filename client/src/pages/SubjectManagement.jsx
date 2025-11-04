
// import React, { useState } from 'react';
// import { useSubject } from '../contexts/SubjectContext';
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
// } from '@mui/material';

// const SubjectManagement = () => {
//   const { subjects, addSubject, updateSubject, deleteSubject } = useSubject();
//   const [open, setOpen] = useState(false);
//   const [currentSubject, setCurrentSubject] = useState(null);
//   const [formData, setFormData] = useState({ name: '', code: '' });

//   const handleOpen = (subject = null) => {
//     setCurrentSubject(subject);
//     setFormData(subject ? { name: subject.name, code: subject.code } : { name: '', code: '' });
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentSubject(null);
//     setFormData({ name: '', code: '' });
//   };

//   const handleSave = async () => {
//     if (currentSubject) {
//       await updateSubject(currentSubject._id, formData);
//     } else {
//       await addSubject(formData);
//     }
//     handleClose();
//   };

//   const handleDelete = async (id) => {
//     await deleteSubject(id);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Subject Management
//       </Typography>
//       <Button variant="contained" color="primary" onClick={() => handleOpen()}>
//         Add Subject
//       </Button>
//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Code</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {subjects.map((subject) => (
//               <TableRow key={subject._id}>
//                 <TableCell>{subject.name}</TableCell>
//                 <TableCell>{subject.code}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleOpen(subject)}>Edit</Button>
//                   <Button onClick={() => handleDelete(subject._id)}>Delete</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{currentSubject ? 'Edit' : 'Add'} Subject</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Subject Name"
//             name="name"
//             type="text"
//             fullWidth
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Subject Code"
//             name="code"
//             type="text"
//             fullWidth
//             value={formData.code}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default SubjectManagement;









// import React, { useState } from 'react';
// import { useSubject } from '../contexts/SubjectContext';
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
//   Alert,
//   CircularProgress,
// } from '@mui/material';

// const SubjectManagement = () => {
//   const { subjects, addSubject, updateSubject, deleteSubject, fetchSubjects } = useSubject();
//   const { departments } = useDepartment();

//   const [open, setOpen] = useState(false);
//   const [currentSubject, setCurrentSubject] = useState(null);
//   const [formData, setFormData] = useState({ name: '', code: '', department: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleOpen = (subject = null) => {
//     setCurrentSubject(subject);
//     setFormData(
//       subject
//         ? {
//             name: subject.name,
//             code: subject.code,
//             department: subject.department?._id || subject.department || '',
//           }
//         : { name: '', code: '', department: '' }
//     );
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentSubject(null);
//     setFormData({ name: '', code: '', department: '' });
//     setError('');
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     // simple validation
//     if (!formData.name || !formData.code || !formData.department) {
//       setError('All fields are required.');
//       return;
//     }

//     setLoading(true);
//     try {
//       if (currentSubject) {
//         await updateSubject(currentSubject._id, formData);
//       } else {
//         await addSubject(formData);
//       }
//       handleClose();
//       fetchSubjects();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to save subject.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this subject?')) {
//       setLoading(true);
//       try {
//         await deleteSubject(id);
//         fetchSubjects();
//       } catch (err) {
//         console.error(err);
//         setError('Failed to delete subject.');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom color="error">
//         Subject Management
//       </Typography>

//       <Button
//         variant="contained"
//         sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: '#b71c1c' } }}
//         onClick={() => handleOpen()}
//       >
//         Add Subject
//       </Button>

//       {loading && <CircularProgress sx={{ ml: 2 }} />}
//       {error && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table>
//           <TableHead sx={{ backgroundColor: '#ffebee' }}>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Code</TableCell>
//               <TableCell>Department</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {subjects.map((subject) => (
//               <TableRow key={subject._id}>
//                 <TableCell>{subject.name}</TableCell>
//                 <TableCell>{subject.code}</TableCell>
//                 <TableCell>
//                   {departments.find((d) => d._id === subject.department)?.name || 'N/A'}
//                 </TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleOpen(subject)}>Edit</Button>
//                   <Button
//                     onClick={() => handleDelete(subject._id)}
//                     sx={{ color: 'red' }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add/Edit Dialog */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ color: 'red' }}>
//           {currentSubject ? 'Edit' : 'Add'} Subject
//         </DialogTitle>

//         <DialogContent>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <TextField
//             autoFocus
//             margin="dense"
//             label="Subject Name"
//             name="name"
//             fullWidth
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Subject Code"
//             name="code"
//             fullWidth
//             value={formData.code}
//             onChange={handleChange}
//           />

//           <FormControl fullWidth margin="dense">
//             <InputLabel>Department</InputLabel>
//             <Select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//             >
//               {departments.map((dept) => (
//                 <MenuItem key={dept._id} value={dept._id}>
//                   {dept.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button
//             onClick={handleSave}
//             sx={{
//               backgroundColor: 'red',
//               color: 'white',
//               '&:hover': { backgroundColor: '#b71c1c' },
//             }}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default SubjectManagement;










import React, { useState, useEffect } from 'react';
import { useSubject } from '../contexts/SubjectContext';
import { useDepartment } from '../contexts/DepartmentContext';
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
  InputLabel,
  FormControl,
} from '@mui/material';

const SubjectManagement = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubject();
  const { departments, fetchDepartments } = useDepartment();

  const [open, setOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', department: '' });

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleOpen = (subject = null) => {
    setCurrentSubject(subject);
    setFormData(
      subject
        ? { name: subject.name, code: subject.code, department: subject.department?._id || '' }
        : { name: '', code: '', department: '' }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSubject(null);
    setFormData({ name: '', code: '', department: '' });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.code || !formData.department) {
      alert('Please fill all fields.');
      return;
    }
    try {
      if (currentSubject) {
        await updateSubject(currentSubject._id, formData);
      } else {
        await addSubject(formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving subject:', error);
      alert('Something went wrong while saving.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      await deleteSubject(id);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Subject Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Subject
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject._id}>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.department?.name || '—'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(subject)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(subject._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentSubject ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            name="name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Subject Code"
            name="code"
            type="text"
            fullWidth
            value={formData.code}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              label="Department"
            >
              {departments.map((dept) => (
                <MenuItem key={dept._id} value={dept._id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubjectManagement;
