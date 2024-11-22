import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ModuleSidebar } from "./ModuleSidebar";
import { ContentLoader } from "./ContentLoader";
import { ModuleContent } from "./ModuleContent/ModuleContent";
import { PaginationControls } from "./PaginationControls";

const SERVER = import.meta.env.VITE_API_URL;

export default function Module() {
  const location = useLocation();
  const { course, selectedModuleId, courseProgressId } = location.state || {};
  const [moduleId, setModuleId] = useState (selectedModuleId);
  const [moduleContent, setContent] = useState(null);

  useEffect(() => {
    const fetchModuleContent = async () => {
      try {
        const response = await fetch(`${SERVER}/content/getModuleDetailCatalog/${moduleId}`);
        const result = await response.json();
        setContent(result.data[0]);
      } catch (err) {
        console.error("Error al obtener los datos del curso", err);
      }
    };
    fetchModuleContent();
  }, [moduleId]);

  // Verifica que moduleContent esté cargado antes de renderizar el contenido
  if (!moduleContent) return <ContentLoader />;

  const { content, quiz } = moduleContent;

  return (
    <>
      <ModuleSidebar modules={course.modules} setModule={setModuleId} course={course} />
      <div>
        {content ? (
          <ModuleContent content={content} questions={quiz.questions} studentCourseId={courseProgressId} moduleId={moduleContent.id} />
        ) : (
          <ContentLoader />
        )}
        <PaginationControls module={moduleId} setModule={setModuleId} maxModules={content.length} />
      </div>
    </>
  );
}
