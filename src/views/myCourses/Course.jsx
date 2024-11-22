import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpenIcon, 
  ClockIcon, 
  TrendingUpIcon, 
  Lock, 
  Award,
  Star,
  // AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const getModuleStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-700 border-green-500';
      case 'in-progress': return 'bg-blue-700 border-blue-500';
      case 'locked': return 'bg-gray-700 border-gray-500';
      default: return 'text-gray-900 bg-white border-gray-900';
    }
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
          {/* Course Header */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              className="w-full h-64 object-cover"
              src={`https://codeflex.space/images/courses/${course.img}`}
              alt={course.name}
              onError={(e) => { e.target.src = "/assets/images/no-img.png"; }}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h1 className="text-4xl font-bold text-white drop-shadow-md">
                {course.name}
              </h1>
            </div>
          </div>

          {/* Course Overview */}
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Descripción */}
                <div className="flex flex-col justify-center items-center md:items-start">
                  <div className="flex items-center space-x-4">
                    <BookOpenIcon className="h-10 w-10 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Descripción</p>
                      <p className="font-semibold">{course.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Progreso */}
                <div className="flex items-center space-x-4">
                  <TrendingUpIcon className="h-10 w-10 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Progreso General</p>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={courseProgress.progress || 0} 
                        className="w-full" 
                      />
                      <span className="font-bold">
                        {courseProgress.progress || 0}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Módulos */}
                <div className="flex items-center space-x-4">
                  <ClockIcon className="h-10 w-10 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Módulos</p>
                    <Badge variant="secondary">
                      {course.modules?.length || 0} Módulos
                    </Badge>
                  </div>
                </div>

                {/* Nueva columna para nivel */}
                <div className="flex items-center space-x-4">
                  <Award className="h-10 w-10 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nivel Actual</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-lg">
                        Nivel {courseProgress.level || 1}
                      </Badge>
                      {levelRequirements?.canLevelUp && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Star className="h-5 w-5 text-yellow-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>¡Listo para subir de nivel!</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Progress Card - Nuevo */}
          {levelRequirements && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Progreso del Nivel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Módulos Completados</span>
                      <span>{Math.round(levelRequirements.completionRate)}%</span>
                    </div>
                    <Progress value={levelRequirements.completionRate} className="w-full" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {levelRequirements.completionRate >= 80 ? (
                      <Badge variant="success">✓ 80% del nivel completado</Badge>
                    ) : (
                      <Badge variant="secondary">
                        {Math.round(levelRequirements.completionRate)}% / 80% completado
                      </Badge>
                    )}
                    
                    {levelRequirements.hasHigherModuleCompleted ? (
                      <Badge variant="success">✓ Módulo superior completado</Badge>
                    ) : (
                      <Badge variant="secondary">Necesitas completar un módulo del siguiente nivel</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Modules Section - modificado para mostrar niveles */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Módulos del Curso</h2>
            {Object.entries(modulesByLevel).map(([level, modules]) => (
              <div key={level} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <span>Nivel {level}</span>
                  {!canAccessModule(parseInt(level)) && (
                    <Lock className="h-5 w-5 text-gray-500" />
                  )}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modules.map(module => {
                    const status = getModuleStatus(module);
                    return (
                      <Card 
                        key={module.id} 
                        className={`hover:shadow-lg transition-shadow cursor-pointer border-2 ${getModuleStatusColor(status)}`}
                        onClick={() => {
                          if (status !== 'locked') {
                            navigate(`/my-courses/module/${module.name}`, { 
                              state: { 
                                course, 
                                selectedModuleId: module.id, 
                                courseProgressId: courseProgress.id 
                              } 
                            });
                          }
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              {module.name}
                            </CardTitle>
                            {status === 'locked' && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Lock className="h-5 w-5 text-gray-500" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Necesitas subir de nivel para acceder</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {status === 'completed' && (
                              <Star className="h-5 w-5 text-yellow-500" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={courseProgress.module_progress?.[module.id] || 0} 
                              className="w-full" 
                            />
                            <span className="font-bold text-sm">
                              {courseProgress.module_progress?.[module.id] || 0}%
                            </span>
                          </div>
                          {status === 'in-progress' && (
                            <Badge variant="secondary" className="mt-2">
                              En progreso
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}