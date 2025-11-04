
// import React, { useState } from 'react';
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
// } from '@mui/material';

// const DepartmentManagement = () => {
//   const { departments, addDepartment, updateDepartment, deleteDepartment } = useDepartment();
//   const [open, setOpen] = useState(false);
//   const [currentDepartment, setCurrentDepartment] = useState(null);
//   const [name, setName] = useState('');

//   const handleOpen = (department = null) => {
//     setCurrentDepartment(department);
//     setName(department ? department.name : '');
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentDepartment(null);
//     setName('');
//   };

//   const handleSave = async () => {
//     if (currentDepartment) {
//       await updateDepartment(currentDepartment._id, name);
//     } else {
//       await addDepartment(name);
//     }
//     handleClose();
//   };

//   const handleDelete = async (id) => {
//     await deleteDepartment(id);
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Department Management
//       </Typography>
//       <Button variant="contained" color="primary" onClick={() => handleOpen()}>
//         Add Department
//       </Button>
//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {departments.map((department) => (
//               <TableRow key={department._id}>
//                 <TableCell>{department.name}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleOpen(department)}>Edit</Button>
//                   <Button onClick={() => handleDelete(department._id)}>Delete</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{currentDepartment ? 'Edit' : 'Add'} Department</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Department Name"
//             type="text"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
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

// export default DepartmentManagement;















// import React, { useState } from 'react';
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
// } from '@mui/material';

// const DepartmentManagement = () => {
//   const { departments, addDepartment, updateDepartment, deleteDepartment } = useDepartment();
//   const [open, setOpen] = useState(false);
//   const [currentDepartment, setCurrentDepartment] = useState(null);
//   const [name, setName] = useState('');

//   const handleOpen = (department = null) => {
//     setCurrentDepartment(department);
//     setName(department ? department.name : '');
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentDepartment(null);
//     setName('');
//   };

//   const handleSave = async () => {
//     try {
//       if (!name.trim()) {
//         alert('Department name is required');
//         return;
//       }

//       if (currentDepartment) {
//         await updateDepartment(currentDepartment._id, { name });
//       } else {
//         await addDepartment({ name });
//       }

//       handleClose();
//     } catch (error) {
//       console.error('Failed to save department:', error);
//       alert('Failed to save department');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this department?')) {
//       await deleteDepartment(id);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Department Management
//       </Typography>
//       <Button variant="contained" color="primary" onClick={() => handleOpen()}>
//         Add Department
//       </Button>

//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {departments.map((department) => (
//               <TableRow key={department._id}>
//                 <TableCell>{department.name}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleOpen(department)}>Edit</Button>
//                   <Button color="error" onClick={() => handleDelete(department._id)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{currentDepartment ? 'Edit' : 'Add'} Department</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Department Name"
//             type="text"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
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

// export default DepartmentManagement;




import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

const DepartmentManagement = () => {
  const { departments, addDepartment, updateDepartment, deleteDepartment, fetchDepartments } = useDepartment();
  const [open, setOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [name, setName] = useState('');

  // ✅ Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleOpen = (department = null) => {
    setCurrentDepartment(department);
    setName(department ? department.name : '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDepartment(null);
    setName('');
  };

  const handleSave = async () => {
    try {
      if (!name.trim()) {
        alert('Department name is required');
        return;
      }

      if (currentDepartment) {
        await updateDepartment(currentDepartment._id, { name });
      } else {
        await addDepartment({ name });
      }

      handleClose();
    } catch (error) {
      console.error('Failed to save department:', error);
      alert('Failed to save department');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await deleteDepartment(id);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Department Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Department
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department._id}>
                <TableCell>{department.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(department)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(department._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentDepartment ? 'Edit' : 'Add'} Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepartmentManagement;
