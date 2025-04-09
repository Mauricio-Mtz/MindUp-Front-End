import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SERVER = import.meta.env.VITE_API_URL;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function UserProgressStatistics() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener cursos del estudiante
        const coursesRes = await fetch(`${SERVER}/users/getCoursesByStudent?email=${user.email}`);
        const coursesData = await coursesRes.json();
        
        if (!coursesData.success) throw new Error(coursesData.message);

        // 2. Obtener progreso para cada curso
        const coursesWithProgress = await Promise.all(
          coursesData.data.map(async course => {
            const progressRes = await fetch(`${SERVER}/users/getStudentProgress`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userEmail: user.email,
                courseId: course.id
              })
            });
            const progressData = await progressRes.json();
            return { ...course, progress: progressData.data };
          })
        );

        setCourses(coursesWithProgress);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.email]);

  // Datos para gráficos
  const courseProgressData = courses.map(course => ({
    name: course.name.substring(0, 15) + (course.name.length > 15 ? '...' : ''),
    progress: Math.round((course.progress?.progress || 0) * 100),
    modules: Object.keys(course.progress?.module_progress || {}).length
  }));

  const moduleProgressData = courses.flatMap(course => 
    Object.entries(course.progress?.module_progress || {}).map(([moduleId, progress]) => ({
      name: `M${moduleId}`,
      progress,
      course: course.name.substring(0, 10) + (course.name.length > 10 ? '...' : '')
    }))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Cargando estadísticas de progreso...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-10 ">
      <h2 className="text-2xl font-bold">Mi Progreso de Aprendizaje</h2>
      
      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Cursos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{courses.length}</p>
          </CardContent>
        </Card>
        
        {/* <Card>
          <CardHeader>
            <CardTitle>Progreso Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {courses.length ? 
                Math.round(courses.reduce((sum, course) => sum + (course.progress?.progress || 0), 0) / courses.length * 100) : 0}%
            </p>
          </CardContent>
        </Card> */}
        
        <Card>
          <CardHeader>
            <CardTitle>Módulos Completados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {courses.reduce((total, course) => {
                if (!course.progress?.module_progress) return total;
                return total + Object.values(course.progress.module_progress).filter(p => p === 100).length;
              }, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de progreso por curso */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Progreso por Curso</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Progreso']}
                labelFormatter={(label) => `Curso: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="progress" 
                name="Progreso" 
                fill="#8884d8"
                animationDuration={1500}
              >
                {courseProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      {/* Gráfico de módulos completados */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso de Módulos</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={moduleProgressData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="progress"
                nameKey="name"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {moduleProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Progreso']}
                labelFormatter={(label) => `Módulo: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detalle por curso */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Detalle de Progreso por Curso</h3>
        {courses.map(course => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium">Progreso por módulo:</h4>
                {Object.entries(course.progress?.module_progress || {}).map(([moduleId, progress]) => (
                  <div key={moduleId} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Módulo {moduleId}</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}