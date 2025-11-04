
import React, { useState } from 'react';
import { useExamHall } from '../contexts/ExamHallContext';
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

const ExamHallManagement = () => {
  const { examHalls, addExamHall, updateExamHall, deleteExamHall } = useExamHall();
  const [open, setOpen] = useState(false);
  const [currentExamHall, setCurrentExamHall] = useState(null);
  const [formData, setFormData] = useState({ name: '', capacity: '' });

  const handleOpen = (hall = null) => {
    setCurrentExamHall(hall);
    setFormData(hall ? { name: hall.name, capacity: hall.capacity } : { name: '', capacity: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentExamHall(null);
    setFormData({ name: '', capacity: '' });
  };

  const handleSave = async () => {
    if (currentExamHall) {
      await updateExamHall(currentExamHall._id, formData);
    } else {
      await addExamHall(formData);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteExamHall(id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Exam Hall Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Exam Hall
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examHalls.map((hall) => (
              <TableRow key={hall._id}>
                <TableCell>{hall.name}</TableCell>
                <TableCell>{hall.capacity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(hall)}>Edit</Button>
                  <Button onClick={() => handleDelete(hall._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentExamHall ? 'Edit' : 'Add'} Exam Hall</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Hall Name"
            name="name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Capacity"
            name="capacity"
            type="number"
            fullWidth
            value={formData.capacity}
            onChange={handleChange}
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

export default ExamHallManagement;
