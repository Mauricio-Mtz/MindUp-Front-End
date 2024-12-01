import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NabvarA from "@/components/elements/nabvarAside";
import HeaderAdmin from "@/components/elements/headerAdmins";

// Importa las vistas que necesitas
import HomeOrg from "@/views/organizations/homeOrg/homeOrg";
import CourseOrg from "@/views/organizations/coursesOrg/coursesOrg";
import Reports from "@/views/organizations/reportsOrg/reportsOrg";
import Members from "@/views/organizations/membersOrg/membersOrg";
import Statistics from "@/views/organizations/stadisticsOrg/stadisticsOrg";
import EditAddCourse from "@/views/organizations/coursesOrg/edit_Add_Course";

export default function IndexOrganization() {
    const [title, setTitle] = useState("Inicio");
    const user = JSON.parse(localStorage.getItem('user'));
    const organization = user.organization_name;

    const navigate = useNavigate();
    const location = useLocation();

    const handleEditCourse = (course) => {
        navigate(`/admin/edit`, { state: { course } });
    };

    useEffect(() => {
        const pathToTitle = {
            "/admin": "Inicio",
            "/admin/courses": "Gestión de Cursos",
            "/admin/reports": "Generar Reportes",
            "/admin/members": "Gestión de Miembros",
            "/admin/add": "Añadir Curso",
        };

        // Chequeo si la ruta coincide con el patrón de edición
        const editCourseMatch = location.pathname.match(/^\/admin\/edit\/[^/]+$/);
        if (editCourseMatch) {
            setTitle("Editar Curso");
        } else {
            setTitle(pathToTitle[location.pathname] || "Inicio");
        }
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <NabvarA />
            <HeaderAdmin title={title} organization={organization} />
            <div className="flex flex-col gap-2 py-1 pl-14">
                <main className="sm:px-1 p-2 md:px-2 md:p-4 lg:p-4 lg:px-8 py-0">
                    <Routes>
                        <Route path="/" element={<HomeOrg />} />
                        <Route path="/courses" element={<CourseOrg onEditCourse={handleEditCourse} />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/members" element={<Members />} />
                        <Route path="/stadistic" element={<Statistics />} />
                        <Route path="/edit/:name" element={<EditAddCourse />} />
                        <Route path="/add" element={<EditAddCourse />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
