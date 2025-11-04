
import React, { useState } from 'react';
import { useSeatingPlan } from '../contexts/SeatingPlanContext';
import { useExamSchedule } from '../contexts/ExamScheduleContext';
import { useExamHall } from '../contexts/ExamHallContext';
import {
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const SeatingPlan = () => {
  const { generateSeatingPlan, getSeatingPlanByHall } = useSeatingPlan();
  const { schedules } = useExamSchedule();
  const { examHalls } = useExamHall();
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedHall, setSelectedHall] = useState('');
  const [seatingPlan, setSeatingPlan] = useState([]);

  const handleGenerate = async () => {
    if (selectedSchedule) {
      const result = await generateSeatingPlan(selectedSchedule);
      alert(result.message);
    }
  };

  const handleView = async () => {
    if (selectedHall) {
      const result = await getSeatingPlanByHall(selectedHall);
      setSeatingPlan(result);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Seating Plan
      </Typography>

      <FormControl fullWidth margin="dense">
        <InputLabel>Select Exam Schedule</InputLabel>
        <Select
          value={selectedSchedule}
          onChange={(e) => setSelectedSchedule(e.target.value)}
        >
          {schedules.map((schedule) => (
            <MenuItem key={schedule._id} value={schedule._id}>
              {schedule.subject.name} - {new Date(schedule.date).toLocaleDateString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleGenerate} sx={{ mt: 1 }}>
        Generate Seating Plan
      </Button>

      <hr style={{ margin: '20px 0' }} />

      <FormControl fullWidth margin="dense">
        <InputLabel>Select Exam Hall</InputLabel>
        <Select
          value={selectedHall}
          onChange={(e) => setSelectedHall(e.target.value)}
        >
          {examHalls.map((hall) => (
            <MenuItem key={hall._id} value={hall._id}>
              {hall.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleView} sx={{ mt: 1 }}>
        View Seating Plan
      </Button>

      {seatingPlan.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Seat Number</TableCell>
                <TableCell>Subject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seatingPlan.map((seat, index) => (
                <TableRow key={index}>
                  <TableCell>{seat.student}</TableCell>
                  <TableCell>{seat.rollNo}</TableCell>
                  <TableCell>{seat.seatNumber}</TableCell>
                  <TableCell>{seat.subject}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default SeatingPlan;
