import { useState, useEffect } from "react";
import NabvarA from "@/components/elements/nabvarAside";
import HeaderAdmin from "@/components/elements/headerAdmins";

import HomeOrg from "@/views/organizations/homeOrg/homeOrg";
import CourseOrg from "@/views/organizations/coursesOrg/coursesOrg"; 
import Reports from "@/views/organizations/reportsOrg/reportsOrg";
import Members from "@/views/organizations/memberOrg/membersOrg";
import EditAddCourse from "@/views/organizations/coursesOrg/edit_Add_Course"; 

export default function IndexOrganization() {
    // Lee el componente seleccionado del localStorage, o establece "home" como valor por defecto
    const [selectedComponent, setSelectedComponent] = useState(() => {
        return localStorage.getItem("selectedComponent") || "home";
    });
    const [title, setTitle] = useState("Inicio");
    const [organization, setOrganization] = useState("");

    const [showEditAddCourse, setShowEditAddCourse] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null); 

    const handleEditCourse = (course) => {
        setCourseToEdit(course);
        setShowEditAddCourse(true);
    };

    const handleSelectComponent = (component) => {
        setSelectedComponent(component);
        setShowEditAddCourse(false); // Cerrar el editor al seleccionar otro componente
    };

    const renderComponent = () => {
        if (showEditAddCourse) {
            return <EditAddCourse course={courseToEdit} title={setSelectedComponent} onClose={() => setShowEditAddCourse(false)} />;
        }

        switch (selectedComponent) {
            case "home":
                return <HomeOrg />;
            case "courses":
                return <CourseOrg onEditCourse={handleEditCourse} />;
            case "reports":
                return <Reports />;
            case "members":
                return <Members />;
            case "edit":
                return <EditAddCourse course={courseToEdit} title={setSelectedComponent} onClose={() => setShowEditAddCourse(false)} />
            case "add":
                return <EditAddCourse course={courseToEdit} title={setSelectedComponent} onClose={() => setShowEditAddCourse(false)} />
            default:
                return <HomeOrg />;
        }
    };

    // Cambia el título basado en el componente seleccionado
    useEffect(() => {
        switch (selectedComponent) {
            case "home":
                setTitle("Inicio");
                break;
            case "courses":
                setTitle("Gestión de Cursos");
                break;
            case "reports":
                setTitle("Generar Reportes");
                break;
            case "members":
                setTitle("Gestión de Miembros");
                break;
            case "edit":
                setTitle("Editar Curso");
                break;
            case "add":
                setTitle("Añadir Curso");
                break;
            default:
                setTitle("Inicio");
        }
    }, [selectedComponent]);

    useEffect(() => {
        // Llamada a la sesión para obtener el nombre de la organización
        setOrganization("Nombre de la organización");
    }, []);

    // Guarda el componente seleccionado en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("selectedComponent", selectedComponent);
    }, [selectedComponent]);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <NabvarA setSelectedComponent={handleSelectComponent} />
            <HeaderAdmin title={title} organization={organization} />
            <div className="flex flex-col gap-2 py-1 pl-14">
                <main className="sm:px-1 p-2 md:px-2 md:p-4 lg:p-4 lg:px-8 py-0">
                    {renderComponent()}
                </main>
            </div>
        </div>
    );
}
