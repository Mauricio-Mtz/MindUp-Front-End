import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpenIcon, ClockIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

const SERVER = import.meta.env.VITE_API_URL;

export default function Course() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course: initialCourse } = location.state;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState({});

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
        } else {
          console.log(result.message);
        }
      } catch (err) {
        console.error('Error al obtener los datos del progreso del estudiante', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProgress();
  }, [initialCourse.id]);

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
              <div className="grid md:grid-cols-3 gap-4">
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
              </div>
            </CardContent>
          </Card>

          {/* Modules Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Módulos del Curso</h2>
            {course.modules && course.modules.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.modules.map(module => (
                  <Card 
                    key={module.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/my-courses/module/${module.name}`, { 
                      state: { course, selectedModuleId: module.id } 
                    })}
                  >
                    <CardHeader>
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
                        <CardTitle className="text-base sm:text-lg text-center sm:text-left flex-grow sm:basis-3/4">
                          {module.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-center flex-grow sm:basis-1/4">
                          Nivel: {module.level}
                        </Badge>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No hay módulos disponibles en este curso.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}