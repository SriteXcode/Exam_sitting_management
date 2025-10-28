
import React, { useEffect, useState } from 'react';
import { useDepartments } from '../contexts/DepartmentContext';
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
  const { departments, fetchDepartments, addDepartment, updateDepartment, deleteDepartment } = useDepartments();
  const [open, setOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

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
    if (currentDepartment) {
      await updateDepartment(currentDepartment._id, name);
    } else {
      await addDepartment(name);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteDepartment(id);
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
                  <Button onClick={() => handleDelete(department._id)}>Delete</Button>
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
