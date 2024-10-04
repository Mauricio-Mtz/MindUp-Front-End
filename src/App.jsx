import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// importación de vistas
import MainPage from './views/mainPage.jsx';
import Auth from './views/auth/Auth.jsx';
import Courses from './views/courses/courses.jsx';
import CourseDetail from './views/courses/course.jsx'; // Renombrado para evitar confusión

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:name" element={<CourseDetail />} /> {/* Ruta dinámica con solo el nombre del curso */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
