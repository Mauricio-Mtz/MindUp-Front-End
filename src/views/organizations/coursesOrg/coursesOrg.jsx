import ChartUserXcourse from "@/components/elements/charts/usuerByCourse/chartUserByCourse";
import ChartFinishedCourse from "@/components/elements/charts/averageFinishedCourses/averageFinishedCourses";
import Table1 from "@/components/elements/tables/tableCourses/tableCourses";
import TableComponent from "@/components/elements/TableComponent/TableComponent";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_API_URL;

export default function CourseOrg({onEditCourse}) {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const fetchCourses = async () => {
    try {
      const response = await fetch(`${SERVER}/content/getAllCourses`);
      const data = await response.json();
      setCourses(data.data);
      console.error(data.data);
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
    }
  }

  const handleDeleteCourse = async (action, course) => {
    switch (action) {
      case "edit":
        console.log("edit course", course);
        navigate(`/admin/edit/${course.name}`, { state: { course } });
        break;
      case "delete":
        console.log("Deleting course", course);
        break;
      default:
        break;
    }
  }

  const handleAddCourse = () => {
    const course = null;

    navigate('/admin/add', { state: { course } });
  };

  const addCourse = async () => {
    try {
      const response = await fetch(`${SERVER}/content/getAllCourses`);
      const data = await response.json();
      setCourses(data.data);
      console.error(data.data);
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);


  return (
    <div >
      {/* Seccion de graficos */}
      <div className="hidden sm:grid flex-1 items-start gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <div className="flex flex-row gap-4">
          <ChartUserXcourse/> 
        </div>
        <div className="flex flex-row gap-4">
          <ChartFinishedCourse/>  
        </div>
        <div className="flex flex-row gap-4">
          <ChartUserXcourse/>  
        </div>
      </div>
      {/* Seccion de CRUD */}
      {/*<div className="flex flex-row w-full align-middle justify-end mb-0 mt-4 mx-6 px-4">
        <Button className="mr-2" onClick={handleAddCourse}>
          <p className="hidden md:block">+ Añadir curso</p>
          <p className=" md:hidden">+</p>
        </Button>
      </div>*/}
      <div className='bg-card border px-4 my-6 ' style={{borderRadius: '10px'}}>
        {courses && courses.length > 0 ? (
          <TableComponent 
            TableComponentData={courses} 
            TableComponentType={"courses"} 
            onActionClick={handleDeleteCourse} 
          />
        ) : (
          <div>No hay miembros disponibles.</div>
        )}
      </div>          
    </div>
  );
}