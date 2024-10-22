import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/elements/navbar';
import { ProgressBar } from '@/components/elements/progressBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const simulatedCourses = [
                { id: 1, name: 'Curso de Google', description: 'Aprende React desde cero.', img: 'public/assets/images/cursogoogle.png' },
                { id: 2, name: 'Curso de Python', description: 'Crea aplicaciones desde cero', img: 'public/assets/images/cursopython.jpg' },
                { id: 3, name: 'Curso de Machine Learning', description: '', img: 'public/assets/images/cursoml.png' }
            ];

            setTimeout(() => {
                setCourses(simulatedCourses);
            }, 1000);
        };

        fetchCourses();
    }, []);

    if (courses.length === 0) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
                <ProgressBar />
                <h1 className='text-3xl font-bold text-center'>Cargando Cursos...</h1>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='px-20 mt-4'>
                <h1 className='text-3xl font-bold'>Mis Cursos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {courses.map(course => (
                        <Card key={course.id} className="flex flex-col">
                            <CardHeader className="text-left">
                                <CardTitle>{course.name}</CardTitle>
                                <p>{course.description}</p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <img 
                                    src={course.img} 
                                    alt={course.name} 
                                    className="max-h-[120px] object-contain w-full" 
                                    style={{ borderRadius: "0.5rem" }}
                                />
                            </CardContent>
                            <CardFooter className="flex flex-col w-full mt-2">
                                <Button onClick={() => navigate(`/course/${course.id}`)} className="mb-2 w-full">Ver Curso</Button>
                                <Button onClick={() => navigate(`/course/${course.id}/progress`)} className="w-full">Progreso</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
