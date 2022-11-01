import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import DashboardLayout from '@/layout/DashboardLayout';
import Student from '@/pages/dashboards/Student';
import Lecturer from '@/pages/dashboards/Lecturer';
import FrontPage from '@/pages/FrontPage';
import LectureModule from '@/components/modules/LectureModule';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateRepeatingLesson from '@/components/forms/CreateRepeatingLesson';
import Theme from '@/components/ui/MuiTheme';
import StudentModule from '@/components/modules/StudentModule';
import IcalTimetable from '@/pages/IcalTimetable';
import NotFound from '@/pages/NotFound';
import StandardLayout from '@/layout/StandardLayout';

// States
import ModuleState from '@/state/ModuleState';
import Admin from '@/pages/dashboards/Admin';
import Statistics from '@/pages/dashboards/Statistics';
import LectureModuleGroup from '@/components/modules/LectureModuleGroup';

const App = () => (
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <Routes>
        <Route
          path="dashboard"
          element={(
            <ProtectedRoute>
              <ModuleState>
                <DashboardLayout />
              </ModuleState>
            </ProtectedRoute>
          )}
        >
          <Route path="student" element={<Student />}>
            <Route path="module/:moduleId" element={<StudentModule />} />
          </Route>
          <Route path="lecturer" element={<Lecturer />}>
            <Route path="module/:moduleId" element={<LectureModule />}>
              <Route
                path="group/:moduleGroupId"
                element={<LectureModuleGroup />}
              />
            </Route>
            <Route
              path="create/repeatingLesson"
              element={<CreateRepeatingLesson />}
            />
          </Route>
          <Route path="admin" element={<Admin />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="timetable" element={<IcalTimetable />} />
        </Route>
        <Route element={<StandardLayout />}>
          <Route path="auth">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Login logout />} />
          </Route>
          <Route exact path="/" element={<FrontPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
