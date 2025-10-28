
import React, { useEffect, useState } from 'react';
import { useSubjects } from '../contexts/SubjectContext';
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

const SubjectManagement = () => {
  const { subjects, fetchSubjects, addSubject, updateSubject, deleteSubject } = useSubjects();
  const [open, setOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '' });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleOpen = (subject = null) => {
    setCurrentSubject(subject);
    setFormData(subject ? { name: subject.name, code: subject.code } : { name: '', code: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSubject(null);
    setFormData({ name: '', code: '' });
  };

  const handleSave = async () => {
    if (currentSubject) {
      await updateSubject(currentSubject._id, formData);
    } else {
      await addSubject(formData);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteSubject(id);
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject._id}>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(subject)}>Edit</Button>
                  <Button onClick={() => handleDelete(subject._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentSubject ? 'Edit' : 'Add'} Subject</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubjectManagement;
