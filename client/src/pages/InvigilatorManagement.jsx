
import React, { useState } from 'react';
import { useInvigilator } from '../contexts/InvigilatorContext';
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
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const InvigilatorManagement = () => {
  const { invigilators, addInvigilator, updateInvigilator, deleteInvigilator, updateInvigilatorAvailability } = useInvigilator();
  const [open, setOpen] = useState(false);
  const [currentInvigilator, setCurrentInvigilator] = useState(null);
  const [formData, setFormData] = useState({ name: '', isAvailable: true });

  const handleOpen = (invigilator = null) => {
    setCurrentInvigilator(invigilator);
    setFormData(invigilator ? { name: invigilator.name, isAvailable: invigilator.isAvailable } : { name: '', isAvailable: true });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentInvigilator(null);
    setFormData({ name: '', isAvailable: true });
  };

  const handleSave = async () => {
    if (currentInvigilator) {
      await updateInvigilator(currentInvigilator._id, formData);
    } else {
      await addInvigilator(formData);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteInvigilator(id);
  };

  const handleAvailabilityChange = async (id, isAvailable) => {
    await updateInvigilatorAvailability(id, isAvailable);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Invigilator Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Invigilator
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invigilators.map((invigilator) => (
              <TableRow key={invigilator._id}>
                <TableCell>{invigilator.name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={invigilator.isAvailable}
                    onChange={(e) => handleAvailabilityChange(invigilator._id, e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(invigilator)}>Edit</Button>
                  <Button onClick={() => handleDelete(invigilator._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentInvigilator ? 'Edit' : 'Add'} Invigilator</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Invigilator Name"
            name="name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox checked={formData.isAvailable} onChange={handleChange} name="isAvailable" />}
            label="Available"
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

export default InvigilatorManagement;
