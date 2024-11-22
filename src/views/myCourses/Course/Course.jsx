import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CourseHeader } from './CourseHeader';
import { CourseStats } from './CourseStats';
import { ModulesSection } from './ModulesSection';

const SERVER = import.meta.env.VITE_API_URL;

export default function Course() {
    const navigate = useNavigate();
    const location = useLocation();
    const { course: initialCourse } = location.state;
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courseProgress, setCourseProgress] = useState({});
    const [modulesByLevel, setModulesByLevel] = useState({});
  
    // Nuevo estado para controlar los requisitos de nivel
    const [levelRequirements, setLevelRequirements] = useState(null);
  
    useEffect(() => {
      if (course?.modules) {
        // Agrupar módulos por nivel
        const grouped = course.modules.reduce((acc, module) => {
          if (!acc[module.level]) {
            acc[module.level] = [];
          }
          acc[module.level].push(module);
          return acc;
        }, {});
        setModulesByLevel(grouped);
      }
    }, [course]);
  
    useEffect(() => {
      // Calcular requisitos para subir de nivel
      if (courseProgress && modulesByLevel) {
        const currentLevel = courseProgress.level;
        const currentLevelModules = modulesByLevel[currentLevel] || [];
        
        // Calcular progreso del nivel actual
        const completedModules = currentLevelModules.filter(module => 
          (courseProgress.module_progress?.[module.id] || 0) >= 70
        );
        
        const completionRate = (completedModules.length / currentLevelModules.length) * 100;
        
        // Verificar si hay módulos completados del siguiente nivel
        const nextLevelModules = modulesByLevel[currentLevel + 1] || [];
        const hasHigherModuleCompleted = nextLevelModules.some(module => 
          (courseProgress.module_progress?.[module.id] || 0) >= 70
        );
  
        setLevelRequirements({
          completionRate,
          hasHigherModuleCompleted,
          canLevelUp: completionRate >= 80 && hasHigherModuleCompleted
        });
      }
    }, [courseProgress, modulesByLevel]);
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await fetch(`${SERVER}/content/getCourse/${initialCourse.id}`);
          const result = await response.json();
  
          if (result.success) {
            setCourse(result.data);
          } else {
            console.log(result.message);
          }
        } catch (err) {
          console.error('Error al obtener los datos del curso', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, [initialCourse.id]);
  
    useEffect(() => {
      const fetchStudentProgress = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        try {
          const response = await fetch(`${SERVER}/users/getStudentProgress`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: user.email,
              courseId: initialCourse.id,
            }),
          });
  
          const result = await response.json();
  
          if (result.success) {
            setCourseProgress(result.data);
          }
        } catch (err) {
          console.error('Error al obtener los datos del progreso del estudiante', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStudentProgress();
    }, [initialCourse.id]);
  
  
    const canAccessModule = (moduleLevel) => {
      const currentLevel = courseProgress.level || 1;
      return moduleLevel <= currentLevel;
    };
  
    const getModuleStatus = (module) => {
      const progress = courseProgress.module_progress?.[module.id] || 0;
      if (!canAccessModule(module.level)) return 'locked';
      if (progress >= 70) return 'completed';
      if (progress > 0) return 'in-progress';
      return 'available';
    };
  
    // const getModuleStatusColor = (status) => {
    //   switch (status) {
    //     case 'completed': return 'bg-green-700 border-green-500';
    //     case 'in-progress': return 'bg-blue-700 border-blue-500';
    //     case 'locked': return 'bg-gray-700 border-gray-500';
    //     default: return 'text-gray-900 bg-white border-gray-900';
    //   }
    // };


    const handleModuleClick = (module) => {
        navigate(`/my-courses/module/${module.name}`, { 
        state: { 
            course, 
            selectedModuleId: module.id, 
            courseProgressId: courseProgress.id 
        } 
        });
    };

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    return (
        <>
        {course && (
            <div className="space-y-6">
            <CourseHeader course={course} />
            <CourseStats 
                course={course} 
                courseProgress={courseProgress}
                levelRequirements={levelRequirements}
            />
            <ModulesSection
                modulesByLevel={modulesByLevel}
                canAccessModule={canAccessModule}
                getModuleStatus={getModuleStatus}
                courseProgress={courseProgress}
                onModuleClick={handleModuleClick}
            />
            </div>
        )}
        </>
    );
}