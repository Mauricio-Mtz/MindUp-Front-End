import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpenIcon, ClockIcon, LockIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const SERVER = import.meta.env.VITE_API_URL;

export default function CourseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course: initialCourse } = location.state;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState(null);
  const { toast } = useToast();
  const [enrollmentDialog, setEnrollmentDialog] = useState(false);

  useEffect(() => {
    if (alertData) {
      if (alertData.type) {
        toast({
          description: alertData.description,
        });
      } else {
        toast({
          variant: "destructive",
          description: alertData.description,
        });
      }
    }
  }, [alertData, toast]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${SERVER}/content/getCourse/${initialCourse.id}`);
        const result = await response.json();

        if (result.success) {
          setCourse(result.data);
        } else {
          setAlertData({
            type: result.success,
            description: result.message
          });
        }
      } catch (err) {
        console.error('Error al obtener los datos del curso', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [initialCourse.id]);

  const handleEnroll = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      const response = await fetch(`${SERVER}/users/enrollCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: initialCourse.id, studentEmail: user.email }),
      });
      const result = await response.json();

      if (result.success) {
        navigate('/my-courses');
      } else {
        setEnrollmentDialog(false);
        setAlertData({
          type: result.success,
          description: result.message
        });
      }
    } catch (err) {
      console.error('Error al inscribirse en el curso', err);
      setEnrollmentDialog(true);
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
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
              <div className="grid md:grid-cols-3 gap-4 items-center">
                {/* Descripción */}
                <div className="flex flex-col justify-center items-center md:items-start">
                  <div className="flex items-center space-x-4">
                    <BookOpenIcon className="h-10 w-10 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground text-center md:text-left">Descripción</p>
                      <p className="font-semibold text-center md:text-left">{course.description}</p>
                    </div>
                  </div>
                </div>

                
                <div className="flex justify-center">
                  <Button 
                    onClick={() => setEnrollmentDialog(true)} 
                    className="w-full md:w-auto"
                    size="lg"
                  >
                    <CheckIcon className="mr-2 h-5 w-5" />
                    Inscribirse al Curso
                  </Button>
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
                  <Card key={module.id} className="opacity-50 cursor-not-allowed relative">
                    <LockIcon className="h-4 w-4 absolute top-2 right-2" />
                    <CardHeader>
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
                        <CardTitle className="text-base sm:text-lg text-center sm:text-left flex-grow sm:basis-3/4 flex items-center">
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
                          value={0} 
                          className="w-full" 
                        />
                        <span className="font-bold text-sm">
                          0%
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

          {/* Enrollment Confirmation Dialog */}
          <Dialog open={enrollmentDialog} onOpenChange={setEnrollmentDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Inscripción al Curso</DialogTitle>
                <DialogDescription>
                  Estás a punto de inscribirte en el curso {course.name}. 
                  Al inscribirte, tendrás acceso completo a todos los módulos y contenido.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setEnrollmentDialog(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleEnroll}>
                  Confirmar Inscripción
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}