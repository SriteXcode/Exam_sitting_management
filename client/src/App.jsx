import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { DepartmentProvider } from './contexts/DepartmentContext';
import { SubjectProvider } from './contexts/SubjectContext';
import { StudentProvider } from './contexts/StudentContext';
import { ExamHallProvider } from './contexts/ExamHallContext';
import { InvigilatorProvider } from './contexts/InvigilatorContext';
import { ExamScheduleProvider } from './contexts/ExamScheduleContext';
import { SeatingPlanProvider } from './contexts/SeatingPlanContext';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DepartmentProvider>
          <SubjectProvider>
            <StudentProvider>
              <ExamHallProvider>
                <InvigilatorProvider>
                  <ExamScheduleProvider>
                    <SeatingPlanProvider>
                      <Router>
                        <Box sx={{ display: 'flex' }}>
                          <Sidebar />
                          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Toolbar />
                            <AppRoutes />
                          </Box>
                        </Box>
                      </Router>
                    </SeatingPlanProvider>
                  </ExamScheduleProvider>
                </InvigilatorProvider>
              </ExamHallProvider>
            </StudentProvider>
          </SubjectProvider>
        </DepartmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
