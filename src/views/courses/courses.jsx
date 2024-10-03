import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/elementos/navbar';
import { ProgressBar } from '@/components/elementos/progressBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationPrevious,PaginationNext} from "@/components/ui/pagination"; // Importa los componentes de paginación

export default function Courses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8; // Número de cursos por página

    const handleViewDetails = (course) => {
        navigate(`/course/${course.name}`, {
          state: { courseId: course.id },
        });
    };

    // Simula la petición a un servidor para obtener los cursos
    useEffect(() => {
        const fetchCourses = async () => {
            const simulatedData = [
                {id:1, name:'Curso No.1', description:'Curso impartido por Google, en el que se enseña a crear aplicaciones web con sus tecnologías y plataformas.', img:'/assets/images/cursogoogle.png', addedBy:'Google SA de SV'},
                {id:2, name:'Curso No.2', description:'Curso de desarrollo con React, en el que se enseña a crear componentes y aplicaciones web con la biblioteca de Facebook.', img:'/assets/images/cursoreact.png', addedBy:'Facebook'},
                {id:3, name:'Curso No.3', description:'Curso de Machine Learning, en el que se enseña a crear modelos de aprendizaje automático con Python y diferentes bibliotecas y frameworks.', img:'/assets/images/cursoml.webp', addedBy:'IBM'},
                {id:4, name:'Curso No.4', description:'Curso avanzado de Python, en el que se enseña a crear aplicaciones web con Flask y Django, y a utilizar bibliotecas como Pandas y NumPy.', img:'/assets/images/cursopython.jpg', addedBy:'Microsoft'},
                {id:5, name:'Curso No.5', description:'Curso sobre Docker, en el que se enseña a crear contenedores y a manejar aplicaciones en producción con Docker.', img:'/assets/images/cursodocker.jpg', addedBy:'Docker Inc.' },               
                {id:6, name:'Curso No.6', description:'Curso de desarrollo con React, en el que se enseña a crear componentes y aplicaciones web con la biblioteca de Facebook.', img:'/assets/images/cursoreact.png', addedBy:'Facebook'},
                {id:7, name:'Curso No.7', description:'Curso de Machine Learning, en el que se enseña a crear modelos de aprendizaje automático con Python y diferentes bibliotecas y frameworks.', img:'/assets/images/cursoml.webp', addedBy:'IBM'},
                {id:8, name:'Curso No.8', description:'Curso avanzado de Python, en el que se enseña a crear aplicaciones web con Flask y Django, y a utilizar bibliotecas como Pandas y NumPy.', img:'/assets/images/cursopython.jpg', addedBy:'Microsoft'},
                {id:9, name:'Curso No.9', description:'Curso sobre Docker, en el que se enseña a crear contenedores y a manejar aplicaciones en producción con Docker.', img:'/assets/images/cursodocker.jpg', addedBy: 'Docker Inc.'}
            ];

            setTimeout(() => {
                setCourses(simulatedData);
            }, 1000);
        };

        fetchCourses();
    }, []);

    // Calcular los índices de los cursos a mostrar
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    return (
        <>
            <Navbar />
            <div className='px-20 mt-4 gap-10 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Cursos Disponibles</h1>
                <div className="w-[250px]">
                    <Select>
                        <SelectTrigger id="framework">
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="react">React</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {courses.length === 0 && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
                    <ProgressBar />
                    <h1 className='text-3xl font-bold text-center'>Cargando Cursos..</h1>
                </div>
            )}

            <div className="py-5 px-5 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentCourses.map((course) => (
                    <Card key={course.id} className="w-full max-w-[350px] h-[450px] flex flex-col justify-between mx-auto">
                        <CardHeader>
                            <CardTitle>{course.name}</CardTitle>
                            <CardDescription>Añadido por: <b>{course.addedBy}</b></CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center">
                            <div className="flex flex-col items-center justify-between h-full">
                                <img 
                                src={course.img} 
                                alt="img" 
                                className="max-h-[170px] object-contain" 
                                style={{ borderRadius: "0.5rem" }}
                                />
                                <p className="text-center mt-0 max-h-[75px] overflow-hidden text-ellipsis align-top">{course.description}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button style={{ backgroundColor: "#303a53" }} className="w-full" onClick={() => handleViewDetails(course)}>Unirme al curso</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Paginación */}
            {courses.length > coursesPerPage && (
                <Pagination className="my-6">
                    <PaginationContent className="select-none">
                        <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={currentPage === index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        />
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}
