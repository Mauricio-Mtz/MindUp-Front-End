import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Importación de vistas
import MainPage from './views/mainPage.jsx';
import Auth from './views/auth/Auth.jsx';
import Catalog from './views/catalog/Catalog.jsx';
import MyCourses from './views/myCourses/MyCourses.jsx';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/catalog/*" element={<Catalog />} />
        <Route path="/my-courses/*" element={<MyCourses />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
