import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// importación de vistas
import MainPage from './views/mainPage.jsx';
import LoginRegister from './views/login/loginRegister.jsx';
import Courses from './views/courses/courses.jsx';
import CourseDetail from './views/courses/course.jsx'; // Renombrado para evitar confusión

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:name" element={<CourseDetail />} /> {/* Ruta dinámica con solo el nombre del curso */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
