const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '20mb' }));
// app.use((req, res, next) => {
//   console.log('➡️ Incoming:', req.method, req.originalUrl);
//   next();
// });



const subjectRoutes = require('./routes/subjectRoutes');
const hallRoutes = require('./routes/hallRoutes');
const invigilatorRoutes = require('./routes/invigilatorRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const seatingRoutes = require('./routes/seatingRoutes');
const studentRoutes = require('./routes/studentRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const examRoutes = require('./routes/examRoutes');
const importRoutes = require('./routes/importRoutes');
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/invigilators', invigilatorRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/seating', seatingRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/import', importRoutes);
app.use('/api/auth', require('./routes/authRoutes'));



// Sample Route
app.get('/', (req, res) => {
  res.send('ExamEase API is running 🚀');
});
app.get('/test', (req, res) => {
  res.send("Subject API is working 🧠");
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) 
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
