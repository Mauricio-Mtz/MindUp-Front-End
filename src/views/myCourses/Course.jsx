import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const SERVER = import.meta.env.VITE_API_URL;

export default function Course() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course: initialCourse } = location.state;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${SERVER}/courses/getCourse/${initialCourse.id}`);
        const result = await response.json();

        if (result.success) {
          setCourse(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Error al obtener los datos del curso', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [initialCourse.id]);

  if (loading) {
    return <div className="text-center text-lg">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {course && (
        <>    
          <div className="relative w-full max-h-[170px] group">
            <img
              className="w-full max-h-[170px] object-cover rounded-md"
              src={`https://codeflex.space/images/courses/${course.img}`}
              alt={course.name}
              onError={(e) => { e.target.src = "/assets/images/no-img.png"; }}
            />
            {/* Capa oscura encima de la imagen */}
            <div className="absolute inset-0 bg-white dark:bg-black opacity-50 rounded-md"></div>
            <h2 className="absolute bottom-2 left-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{course.name}</h2>
          </div>
          <p className="leading-7">{course.description}</p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Módulos</h2>

          {course.modules && course.modules.length > 0 ? (
            
            <ul className="flex flex-col gap-2">
              {course.modules.map(module => (
                  <Card className="w-full" key={module.id} onClick={() => navigate(`/my-courses/module/${module.name}`, { state: { module } })}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{module.name}</CardTitle>
                        <CardDescription>Nivel: {module.level}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={progress} className="w-full" />
                    </CardContent>
                  </Card>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay módulos disponibles.</p>
          )}
        </>
      )}
    </>
  );
};
