
import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStudent } from '../contexts/StudentContext';
import { useSubject } from '../contexts/SubjectContext';
import { useDepartment } from '../contexts/DepartmentContext';
import { useExamHall } from '../contexts/ExamHallContext';

const Dashboard = () => {
  const { students } = useStudent();
  const { subjects } = useSubject();
  const { departments } = useDepartment();
  const { examHalls } = useExamHall();

  const summaryData = [
    { title: 'Students', value: students.length, link: '/students' },
    { title: 'Subjects', value: subjects.length, link: '/subjects' },
    { title: 'Departments', value: departments.length, link: '/departments' },
    { title: 'Exam Halls', value: examHalls.length, link: '/halls' },
  ];

  const upcomingExams = [
    { subject: 'Mathematics', date: '2025-11-15', time: '10:00 AM' },
    { subject: 'Physics', date: '2025-11-17', time: '02:00 PM' },
    { subject: 'Chemistry', date: '2025-11-19', time: '10:00 AM' },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card component={Link} to={item.link} sx={{ textDecoration: 'none' }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Exams
            </Typography>
            {upcomingExams.map((exam, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <Typography variant="subtitle1">{exam.subject}</Typography>
                <Typography variant="body2">Date: {exam.date}</Typography>
                <Typography variant="body2">Time: {exam.time}</Typography>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Button component={Link} to="/students" variant="contained" fullWidth sx={{ mb: 1 }}>
              Add Student
            </Button>
            <Button component={Link} to="/subjects" variant="contained" fullWidth sx={{ mb: 1 }}>
              Add Subject
            </Button>
            <Button component={Link} to="/departments" variant="contained" fullWidth>
              Add Department
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
