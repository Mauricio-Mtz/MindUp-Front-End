/* eslint-disable react/prop-types */
import ChartUserXcourse from "@/components/elements/charts/usuerByCourse/chartUserByCourse";
import ChartFinishedCourse from "@/components/elements/charts/averageFinishedCourses/averageFinishedCourses";
import { LoadingState } from "@/components/elements/TableComponent/LoadingState";
import TableComponent from "@/components/elements/TableComponent/TableComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_API_URL;

// eslint-disable-next-line no-unused-vars
export default function CourseOrg({onEditCourse}) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${SERVER}/content/getCoursesByOrganization/${user.organization_id}`);
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
    }
  }

  const handleAction = async (action, course) => {
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

  useEffect(() => {
    setTimeout(() => {
      fetchCourses();
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div >
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
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
          {courses && courses.length > 0 ? (
            <TableComponent 
              TableComponentData={courses} 
              TableComponentType={"courses"} 
              onActionClick={handleAction} 
            />
          ) : (
            <div>No hay miembros disponibles.</div>
          )}
        </>
      )}
    </div>
  );
}