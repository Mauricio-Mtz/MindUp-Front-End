/* eslint-disable react/prop-types */
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
  const [moduleId, setModuleId] = useState(selectedModuleId);
  const [moduleContent, setContent] = useState(null);
  const [studentProgress, setStudentProgress] = useState(null);

  // Fetch student progress for tracking module access
  useEffect(() => {
    const fetchStudentProgress = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await fetch(`${SERVER}/users/getStudentProgress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: user.email,
            courseId: course.id,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setStudentProgress(result.data);
        }
      } catch (err) {
        console.error('Error al obtener los datos del progreso del estudiante', err);
      }
    };

    fetchStudentProgress();
  }, [course.id]);

  // Function to determine if a module can be accessed
  const canAccessModule = (moduleLevel) => {
    if (!studentProgress) return false;
    const currentLevel = studentProgress.level || 1;
    return moduleLevel <= currentLevel;
  };

  // Function to get module progress
  const getModuleProgress = (moduleId) => {
    if (!studentProgress || !studentProgress.module_progress) return 0;
    return studentProgress.module_progress[moduleId] || 0;
  };

  // Handle module navigation with access checks
  const handleModuleChange = (newModuleId) => {
    const targetModule = course.modules.find(m => m.id === newModuleId);
    
    if (!targetModule) return;

    if (!canAccessModule(targetModule.level)) {
      alert('No puedes acceder a este módulo. Necesitas subir de nivel primero.');
      return;
    }

    setModuleId(newModuleId);
  };

  // Fetch module content when moduleId changes
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

  // If module content is not loaded, show loader
  if (!moduleContent || !studentProgress) return <ContentLoader />;

  const { content, quiz } = moduleContent;

  // Find available and enabled modules
  const availableModules = course.modules
    .filter(module => canAccessModule(module.level))
    .map(module => module.id);

  const currentModuleIndex = availableModules.indexOf(moduleId);

  return (
    <>
      <ModuleSidebar 
        modules={course.modules.map(module => ({
          ...module,
          disabled: !canAccessModule(module.level),
          progress: getModuleProgress(module.id)
        }))} 
        setModule={handleModuleChange} 
        course={course} 
      />
      <div>
        {content ? (
          <ModuleContent 
            content={content} 
            questions={quiz.questions} 
            studentCourseId={courseProgressId} 
            moduleId={moduleContent.id} 
          />
        ) : (
          <ContentLoader />
        )}
        <PaginationControls 
          module={moduleId} 
          setModule={handleModuleChange} 
          maxModules={availableModules.length}
          currentIndex={currentModuleIndex}
          modules={availableModules}
        />
      </div>
    </>
  );
}