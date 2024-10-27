
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// importación de vistas
import MainPage from './views/mainPage.jsx';
import Auth from './views/auth/Auth.jsx';
import Courses from './views/courses/courses.jsx';
import CourseDetail from './views/courses/course.jsx'; // Renombrado para evitar confusión
import CourseOrg from './views/organizations/coursesOrg/coursesOrg.jsx';
import MembersOrg from './views/organizations/membersOrg.jsx';
import ReportsOrg from './views/organizations/reportsOrg.jsx';
import HomeOrg from './views/organizations/homeOrg.jsx';
import EditCourse from './views/organizations/coursesOrg/edit_add_Course.jsx';
import { useDarkMode } from '@/hooks/useDarkMode';

function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:name" element={<CourseDetail />} /> {/* Ruta dinámica con solo el nombre del curso */}
        <Route path="/admin/courses" element={<CourseOrg/>} /> 
        <Route path="/admin/edit-course/:name" element={<EditCourse />} />
        <Route path="/admin/add-course" element={<EditCourse />} />
        <Route path="/admin/members" element={<MembersOrg/>} /> 
        <Route path="/admin/reports" element={<ReportsOrg/>} /> 
        <Route path="/admin/home" element={<HomeOrg/>} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
