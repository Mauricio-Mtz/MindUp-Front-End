import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// importación de vistas
import MainPage from './views/mainPage.jsx';
import Auth from './views/auth/Auth.jsx';
import Courses from './views/courses/courses.jsx';
import CourseDetail from './views/courses/course.jsx'; // Renombrado para evitar confusión
import Profile from './views/account/Profile.jsx';
import Pay from './views/account/Pay.jsx';
import Mycourses from './views/account/Mycourses.jsx';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:name" element={<CourseDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/mycourses" element={<Mycourses />} />
      </Routes>
    </Router>
  );
}

export default App;
