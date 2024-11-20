import { Button } from "@/components/ui/button";
import TableComponent from "@/components/elements/TableComponent/TableComponent";
import { AddModal } from "@/components/elements/ModalComponent/AddModal/AddModal";
import { UpdateStatusModal } from "@/components/elements/ModalComponent/UpdateStatusModal/UpdateStatusModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_API_URL;

export default function CourseOrg() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${SERVER}/content/getCoursesByOrganization/${user.organization_id}`);
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
    }
  }
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAction = async (action, course) => {
    switch (action) {
      case "add":
        setIsAddModalOpen(true);
        break;
      case "edit":
        navigate(`/admin/edit/${course.name}`, { state: { course } });
        break;
      case "desactive":
        setSelectedCourse(course);
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  }

  const handleDesactiveCourse = async (id) => {
    try {
      const response = await fetch(`${SERVER}/content/desactiveCourse`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        await fetchCourses();
        setIsDeleteModalOpen(false);
        setSelectedCourse(null);
      }
      return data.success;
    } catch (error) {
      console.error("Error eliminando el miembro:", error);
      return false;
    }
  }  

  const handleAddCourse = async (newCourse) => {
    try {
      // Realizar el fetch al servidor
      const response = await fetch(`${SERVER}/content/addNewCourse`, {
        method: "POST",
        body: newCourse, // Enviamos el objeto FormData directamente
      });
  
      // Verificar la respuesta del servidor
      if (!response.ok) {
        throw new Error("Error al añadir el curso. Intente de nuevo.");
      }
  
      const data = await response.json();
      fetchCourses();
      // Redirigir o manejar el curso creado después del fetch (opcional)
      navigate(`/admin/edit/${data.name}`, { state: { course: data } });
  
    } catch (error) {
      console.error("Error al añadir el curso:", error);
      alert("Hubo un problema al añadir el curso. Por favor, revise los datos e intente nuevamente.");
    }
  };  

  return (
    <>
      {/* Seccion de CRUD */}
      <UpdateStatusModal
        isOpen={isDeleteModalOpen}
        closeModal={() => {
          setIsDeleteModalOpen(false);
          setSelectedCourse(null);
        }}
        handleUpdate={() => handleDesactiveCourse(selectedCourse.id)}
      />
      <AddModal
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        handleAdd={(newCourse) => handleAddCourse(newCourse)}
      />
      <div className="flex flex-row w-full align-middle justify-end mb-0 mt-4 mx-6 px-4">
        <Button
          className="mr-2"
          onClick={() => handleAction("add", null)} // Usa una función anónima
        >
          <p className="hidden md:block">+ Añadir curso</p>
          <p className="md:hidden">+</p>
        </Button>
      </div>
      {courses && courses.length > 0 ? (
        <TableComponent 
          key={courses.length}
          TableComponentData={courses} 
          TableComponentType={"courses"} 
          onActionClick={handleAction} 
        />
      ) : (
        <div>No hay cursos disponibles.</div>
      )}       
    </>
  );
}