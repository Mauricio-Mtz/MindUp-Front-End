/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';import { useNavigate } from 'react-router-dom';

import { ProgressCircle } from '@/components/elements/progressCircle';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationPrevious,PaginationNext} from "@/components/ui/pagination";

const SERVER = import.meta.env.VITE_API_URL;

export default function CourseList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8; // Número de cursos por página

    // Simula la petición a un servidor para obtener los cursos
    useEffect(() => {
        setLoading(true);
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${SERVER}/courses/getAllCourses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const coursesData = await response.json();
    
                // Verificar si la API devolvió cursos
                if (coursesData.data && coursesData.data.length > 0) {
                    setCourses(coursesData.data);
                    // console.log("Cursos obtenidos correctamente.", coursesData.data);
                } else {
                    // Si no hay cursos
                    setCourses([]); 
                    console.log("No hay cursos.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
                setCourses([]);  // En caso de error, también establecer un arreglo vacío
                setLoading(false);
            }
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
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                <h1 className='text-2xl sm:text-3xl font-bold md:mb-0'>Cursos Disponibles</h1>
                <div className="w-full sm:w-[250px]">
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
            {loading && 
                <div className='bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center'>
                    <div className='flex w-32 items-center'>
                    <h1 className="text-xl font-bold text-center">Cargando</h1>
                    <ProgressCircle />
                    </div>
                </div>
            }
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentCourses.map((course) => (
                    <Card key={course.id} className="w-full max-w-full h-[450px] flex flex-col justify-between mx-auto">
                        <CardHeader>
                            <CardTitle>{course.name}</CardTitle>
                            <CardDescription>Añadido por: <b>{course.addedBy}</b></CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center">
                            <div className="flex flex-col items-center justify-between h-full">
                                <img
                                    src={`https://codeflex.space/images/courses/${course.img || "cursodocker.png"}`}
                                    alt="img"
                                    className="w-full max-h-[170px] object-cover"
                                    style={{ borderRadius: "0.5rem" }}
                                    onError={(e) => { e.target.src = "/assets/images/no-img.png"; }}
                                />
                                <p className="text-center max-h-[75px] overflow-hidden text-ellipsis align-top">{course.description}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                style={{ backgroundColor: "#303a53" }}
                                className="w-full"
                                onClick={() => navigate(`/catalog/course-detail/${course.name}`, { state: { course } })}
                            >
                                Unirme al curso
                            </Button>
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
