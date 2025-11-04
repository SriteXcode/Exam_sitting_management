import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically attach JWT token to each request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;




//  Authentication

//    - POST /api/auth/register
//    - POST /api/auth/login

//   Departments

//    - GET /api/departments
//    - POST /api/departments
//    - PUT /api/departments/:id
//    - DELETE /api/departments/:id

//   Exams

//    - GET /api/exams
//    - POST /api/exams
//    - GET /api/exams/:id
//    - PUT /api/exams/:id
//    - DELETE /api/exams/:id

//   Exam Halls

//    - POST /api/halls/add
//    - GET /api/halls
//    - GET /api/halls/:id
//    - PUT /api/halls/:id
//    - DELETE /api/halls/:id

//   Import

//    - POST /api/import

//   Invigilators

//    - POST /api/invigilators/add
//    - GET /api/invigilators
//    - GET /api/invigilators/:id
//    - PUT /api/invigilators/:id
//    - DELETE /api/invigilators/:id
//    - PUT /api/invigilators/availability/:id

//   Schedules

//    - POST /api/schedules/add
//    - GET /api/schedules
//    - GET /api/schedules/:id
//    - PUT /api/schedules/:id
//    - DELETE /api/schedules/:id

//   Seating

//    - POST /api/seating/add
//    - GET /api/seating
//    - GET /api/seating/:id
//    - PUT /api/seating/:id
//    - DELETE /api/seating/:id
//    - POST /api/seating/generate/:scheduleId
//    - GET /api/seating/hall/:hallId
//    - PUT /api/seating/reassign/:studentId
//    - GET /api/seating/chart/:scheduleId
//    - POST /api/seating/reallocate/:studentId/:scheduleId

//   Students

//    - POST /api/students/add
//    - GET /api/students

//   Subjects
//    - POST /api/subjects/add
//    - GET /api/subjects
//    - GET /api/subjects/:id
//    - PUT /api/subjects/:id
//    - DELETE /api/subjects/:id
