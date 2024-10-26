/* eslint-disable react/prop-types */
// RecommendedCoursesList.js
import { useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function RecommendedCourses({ recommendedCourses }) {
    const navigate = useNavigate();

    return (
        <div className='hidden md:block h-full w-full md:w-4/12'>    
            <h2 className="scroll-m-20 border-b pb-2 text-center sm:text-left text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">Recomendaciones</h2>
            <ScrollArea className="h-full border-b">
                <ul className="space-y-2 my-2">
                    {recommendedCourses.map(course => (
                        <Card
                            className="w-full transition duration-300 hover:bg-gray-700 hover:text-white" 
                            key={course.id} 
                            onClick={() => navigate(`/catalog/course-detail/${course.name}`, { state: { course } })}
                        >
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle>{course.name}</CardTitle>
                                    <CardDescription>Nivel: {course.level}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
}
