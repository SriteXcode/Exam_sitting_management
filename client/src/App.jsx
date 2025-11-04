import React from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const noSidebarRoutes = ['/login', '/register'];

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
                      <Box sx={{ display: 'flex' }}>
                        {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                          {!noSidebarRoutes.includes(location.pathname) && <Toolbar />}
                          <AppRoutes />
                        </Box>
                      </Box>
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
