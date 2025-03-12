import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ProgressCircle } from "@/components/elements/progressCircle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

const SERVER = import.meta.env.VITE_API_URL;

export default function CourseList() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obtener la ubicación actual
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]); // Estado para almacenar los cursos filtrados
    const [categories, setCategories] = useState([]); // Estado para las categorías
    const [selectedCategory, setSelectedCategory] = useState("all"); // Categoría seleccionada
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;
    const user = JSON.parse(localStorage.getItem("user"));
    
    useEffect(() => {
        setLoading(true);

        const fetchCourses = async () => {
        try {
            console.log(user.preferences)
            const endpoint =
            user.preferences && user.preferences.length > 0
                ? `${SERVER}/content/getCatalog?email=${user.email}`
                : `${SERVER}/content/getCatalog`;

            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const coursesData = await response.json();

            if (coursesData.data && coursesData.data.length > 0) {
                setCourses(coursesData.data);
            } else {
                setCourses([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
            setCourses([]);
            setLoading(false);
        }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${SERVER}/content/getCategories`, {
                    method: "GET",
                });
                const res = await response.json();
                if (res.success) {
                    setCategories(res.data); // Guarda las categorías
                }
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchCourses();
        fetchCategories(); // Llamar al fetch de categorías
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get("search");

        let filtered = courses;

        if (searchQuery) {
        filtered = filtered.filter((course) =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        }
        
        if (selectedCategory !== "all") {
            const normalizedCategory = selectedCategory.trim().toLowerCase();
            filtered = filtered.filter((course) => {
                const courseCategories = course.category?.map((cat) => cat.trim().toLowerCase());
                return courseCategories?.includes(normalizedCategory);
            });
        }

        setFilteredCourses(filtered);
    }, [location.search, courses, selectedCategory]);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    return (
        <>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold md:mb-0">Cursos Disponibles</h1>
            <div className="w-full sm:w-[250px]">
                <Select
                    value={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                >
                    <SelectTrigger id="framework">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="all">Todos</SelectItem>
                        {categories.map((category, index) => (
                            <SelectItem key={index} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        {loading && (
            <div className="bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center">
                <div className="flex w-32 items-center">
                    <h1 className="text-xl font-bold text-center">Cargando</h1>
                    <ProgressCircle />
                </div>
            </div>
        )}
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                    <Card
                        key={course.id}
                        className="w-full max-w-full h-[450px] flex flex-col justify-between mx-auto"
                    >
                        <CardHeader>
                            <CardTitle>{course.name}</CardTitle>
                            <CardDescription>
                                <b>{course.organization}</b>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center">
                            <div className="flex flex-col items-center justify-between h-full">
                                <img
                                    src={`https://codeflex.space/images/courses/${
                                        course.img || "cursodocker.png"
                                    }`}
                                    alt="img"
                                    className="w-full max-h-[170px] object-cover"
                                    style={{ borderRadius: "0.5rem" }}
                                    onError={(e) => {
                                        e.target.src = "/assets/images/no-img.png";
                                    }}
                                />
                                <p className="text-center max-h-[75px] overflow-hidden text-ellipsis align-top">
                                    {course.description}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                style={{ backgroundColor: "#303a53" }}
                                className="w-full"
                                onClick={() =>
                                    navigate(`/catalog/course-detail/${course.name}`, {
                                    state: { course },
                                    })
                                }
                            >
                            Unirme al curso
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <p>No se encontraron cursos</p>
            )}
        </div>
            {filteredCourses.length > coursesPerPage && (
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
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                        />
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}
