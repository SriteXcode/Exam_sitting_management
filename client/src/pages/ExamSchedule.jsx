
import React, { useEffect, useState } from 'react';
import { useExamSchedules } from '../contexts/ExamScheduleContext';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const ExamSchedule = () => {
  const { schedules, fetchSchedules, addSchedule, updateSchedule, deleteSchedule } = useExamSchedules();
  const { subjects, fetchSubjects } = useSubjects();
  const [open, setOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [formData, setFormData] = useState({ subject: '', date: '', time: '' });

  useEffect(() => {
    fetchSchedules();
    fetchSubjects();
  }, []);

  const handleOpen = (schedule = null) => {
    setCurrentSchedule(schedule);
    setFormData(schedule ? { subject: schedule.subject._id, date: schedule.date, time: schedule.time } : { subject: '', date: '', time: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSchedule(null);
    setFormData({ subject: '', date: '', time: '' });
  };

  const handleSave = async () => {
    if (currentSchedule) {
      await updateSchedule(currentSchedule._id, formData);
    } else {
      await addSchedule(formData);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteSchedule(id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Exam Schedule
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Schedule
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule._id}>
                <TableCell>{schedule.subject.name}</TableCell>
                <TableCell>{new Date(schedule.date).toLocaleDateString()}</TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(schedule)}>Edit</Button>
                  <Button onClick={() => handleDelete(schedule._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentSchedule ? 'Edit' : 'Add'} Schedule</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Time"
            name="time"
            type="time"
            fullWidth
            value={formData.time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
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

export default ExamSchedule;
