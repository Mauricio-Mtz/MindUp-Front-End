import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function HomeOrg() {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Control Total para Crecer y Fortalecer el Conocimiento
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Administra todos los aspectos de la plataforma MindUp desde aquí.
        </p>
      </div>

      {/* Card Principal */}
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle>Contenido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Gestion de Cursos
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Visualiza, crea, edita y elimina cursos. Organiza y categoriza el contenido para brindar una experiencia de aprendizaje efectiva.
              </p>
            </div>
            <div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Gestion de Modulos
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Administra módulos dentro de cada curso, creando contenido paso a paso para personalizar el flujo de aprendizaje.
              </p>
            </div>
            <div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Gestion de Quizzes
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Crea y edita exámenes para evaluar el progreso de los estudiantes. Personaliza preguntas, calificaciones y retroalimentación.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => handleNavigate('/admin/courses')}
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
          >
            Gestionar Cursos
          </Button>
        </CardFooter>
      </Card>

      {/* Segunda fila */}
      <div className="flex gap-6">
        {/* Reportes Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reportes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Genera reportes detallados sobre el progreso de los estudiantes, el desempeño de los cursos y las estadísticas generales de la plataforma.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => handleNavigate('/admin/reports')}
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
            >
              Gestionar Reportes
            </Button>
          </CardFooter>
        </Card>

        {/* Miembros Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Miembros</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Visualiza y gestiona a los miembros de cada curso. Asigna roles, sigue su progreso y asegura que estén al día.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => handleNavigate('/admin/members')}
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
            >
              Gestionar Miembros
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}