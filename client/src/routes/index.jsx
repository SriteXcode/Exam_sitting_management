
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import StudentManagement from '../pages/StudentManagement';
import SubjectManagement from '../pages/SubjectManagement';
import DepartmentManagement from '../pages/DepartmentManagement';
import ExamHallManagement from '../pages/ExamHallManagement';
import InvigilatorManagement from '../pages/InvigilatorManagement';
import ExamSchedule from '../pages/ExamSchedule';
import SeatingPlan from '../pages/SeatingPlan';
import DataImport from '../pages/DataImport';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/students"
        element={<ProtectedRoute><StudentManagement /></ProtectedRoute>}
      />
      <Route
        path="/subjects"
        element={<ProtectedRoute><SubjectManagement /></ProtectedRoute>}
      />
      <Route
        path="/departments"
        element={<ProtectedRoute><DepartmentManagement /></ProtectedRoute>}
      />
      <Route
        path="/halls"
        element={<ProtectedRoute><ExamHallManagement /></ProtectedRoute>}
      />
      <Route
        path="/invigilators"
        element={<ProtectedRoute><InvigilatorManagement /></ProtectedRoute>}
      />
      <Route
        path="/schedules"
        element={<ProtectedRoute><ExamSchedule /></ProtectedRoute>}
      />
      <Route
        path="/seating"
        element={<ProtectedRoute><SeatingPlan /></ProtectedRoute>}
      />
      <Route
        path="/import"
        element={<ProtectedRoute><DataImport /></ProtectedRoute>}
      />
    </Routes>
  );
};

export default AppRoutes;
