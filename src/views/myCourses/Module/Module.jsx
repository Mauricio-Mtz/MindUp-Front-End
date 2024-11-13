import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ModuleSidebar } from "./ModuleSidebar";
import { ContentLoader } from "./ContentLoader";
import { ModuleContent } from "./ModuleContent";
import { PaginationControls } from "./PaginationControls";

const SERVER = import.meta.env.VITE_API_URL;

export default function Module() {
  const location = useLocation();
  const { course } = location.state;
  const [moduleId, setModuleId] = useState (course.modules[0].id);
  const [courseContent, setCourseContent] = useState(null);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const response = await fetch(`${SERVER}/content/getModuleDetail/${moduleId}`);
        const result = await response.json();
        setCourseContent(result.data);
      } catch (err) {
        console.error("Error al obtener los datos del curso", err);
      }
    };
    fetchCourseContent();
  }, [moduleId]);

  // Verifica que courseContent esté cargado antes de renderizar el contenido
  if (!courseContent) return <ContentLoader />;

  const { content, quiz } = courseContent;

  return (
    <>
      <ModuleSidebar modules={course.modules} setModule={setModuleId} />
      <div className="px-16 mb-10">
        {content ? (
          <ModuleContent content={content} questions={quiz.questions} />
        ) : (
          <ContentLoader />
        )}
        <PaginationControls module={moduleId} setModule={setModuleId} maxModules={content.length} />
      </div>
    </>
  );
}
