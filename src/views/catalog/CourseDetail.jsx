import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProgressBar } from '@/components/elements/progressBar';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';
import {Sheet,SheetClose,SheetContent,SheetDescription,SheetFooter,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip";
import {Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationPrevious,PaginationNext} from "@/components/ui/pagination";

export default function CourseDetail() {
    const location = useLocation();
    const { course } = location.state;
    const courseId = course.id;
    const [courseContent, setCourseContent] = useState([]);
    const [module, setModule]= useState(0)

    // Simula la petición a un servidor para obtener los cursos
    useEffect(() => {
        const fetchCourseContent = async () => {
        const simulatedData = [
            {
            id: 1,
            courseId: 1,
            name: "¿Qué son las plataformas digitales?",
            level: 1,
            content: [
                {
                subTitle: "¿Qué son las plataformas digitales?",
                text: "Las plataformas digitales son entornos virtuales que permiten a las personas interactuar, producir, comunicar y acceder a información, bienes y servicios de manera electrónica. Estas se han tornado fundamentales en la vida cotidiana y en la actividad económica, ya que permiten a las empresas y organizaciones presentar sus productos y servicios en un entorno digital, y a los usuarios acceder a ellos de manera rápida y sencilla.",
                videoUrl: "https://www.youtube.com/watch?v=zqLEO5tIuYs"
                },
                {
                subTitle: "Impacto de las plataformas en la economía global",
                text: "Las plataformas digitales han transformado la manera en que las empresas operan, facilitando la expansión global y mejorando la eficiencia operativa. Empresas como Amazon y Alibaba son ejemplos claros de cómo estas plataformas pueden impactar la economía global al ofrecer productos a millones de usuarios en todo el mundo.",
                videoUrl: null
                },
                {
                subTitle: "Tipos de plataformas digitales",
                text: "Existen varios tipos de plataformas digitales, incluyendo plataformas de redes sociales, plataformas de comercio electrónico, plataformas educativas, y muchas más. Cada una tiene un propósito específico, pero todas comparten el objetivo de conectar a los usuarios de manera digital.",
                videoUrl: "https://www.youtube.com/watch?v=9E98PzT1EHY"
                }
            ],
            questions: [
                {
                id: "q1",
                question: "¿Cuál es el origen de las plataformas digitales?",
                options: [
                    "Años 70 con el inicio de Internet",
                    "Años 90 con la aparición del comercio electrónico",
                    "Años 2000 con las redes sociales",
                    "Años 80 con la popularización de las computadoras personales"
                ],
                correctAnswer: 0
                },
                {
                id: "q2",
                question: "¿Cuántos tipos de plataformas digitales existen?",
                options: ["Solo uno", "Dos", "Cuatro", "Varios tipos dependiendo del uso"],
                correctAnswer: 3
                },
                {
                id: "q3",
                question: "¿Cuál es la diferencia entre la tecnología de la web y la de la escritura?",
                options: [
                    "La web es interactiva, la escritura no",
                    "La escritura es más antigua y confiable",
                    "La web permite compartir contenido en tiempo real",
                    "La escritura requiere habilidades analíticas más profundas"
                ],
                correctAnswer: 2
                }
            ]
            },
            {
            id: 2,
            courseId: 1,
            name: "Historia de las plataformas digitales",
            level: 2,
            content: [
                {
                subTitle: "La evolución de las plataformas digitales",
                text: "Desde su creación, las plataformas digitales han evolucionado rápidamente, adaptándose a las necesidades tecnológicas y sociales. Este crecimiento ha permitido que las plataformas se conviertan en parte fundamental de nuestra vida diaria.",
                videoUrl: "https://www.youtube.com/watch?v=VBmZVU6ED_A"
                },
                {
                subTitle: "Las primeras plataformas exitosas",
                text: "Plataformas como eBay y Napster fueron pioneras en sus industrias, demostrando el poder de la digitalización y cómo las plataformas podían conectar a usuarios y servicios a nivel mundial.",
                videoUrl: "https://www.youtube.com/watch?v=5mGuCdlCcNM"
                }
            ],
            questions: [
                {
                id: "q4",
                question: "¿Cuál fue una de las primeras plataformas digitales exitosas?",
                options: ["Facebook", "Amazon", "Napster", "Instagram"],
                correctAnswer: 2
                },
                {
                id: "q5",
                question: "¿En qué década comenzaron a popularizarse las plataformas digitales?",
                options: ["Años 70", "Años 90", "Años 2000", "Años 80"],
                correctAnswer: 1
                }
            ]
            },
            {
            id: 3,
            courseId: 1,
            name: "Futuro de las plataformas digitales",
            level: 3,
            content: [
                {
                subTitle: "Tendencias futuras de las plataformas digitales",
                text: "El futuro de las plataformas digitales está lleno de oportunidades, con avances como la inteligencia artificial y la realidad aumentada, que prometen revolucionar aún más la interacción digital.",
                videoUrl: "https://www.youtube.com/watch?v=Z7hqemwGyBo"
                },
                {
                subTitle: "Desafíos que enfrentarán las plataformas",
                text: "Con el crecimiento exponencial de las plataformas digitales, no solo aumentan las oportunidades para empresas y usuarios, sino que también emergen nuevos desafíos que estas plataformas deben enfrentar para mantenerse competitivas y sostenibles. Algunos de los retos más destacados incluyen: 1.-Privacidad de los datos: La recolección, almacenamiento y uso de los datos de los usuarios se ha convertido en un tema crítico. Con millones de personas interactuando en estas plataformas, la cantidad de datos que se generan es enorme. La protección de estos datos se ha vuelto un desafío central para las plataformas digitales. Escándalos como los relacionados con Cambridge Analytica y Facebook han generado una mayor conciencia pública sobre cómo las plataformas utilizan la información personal. Las plataformas ahora deben implementar medidas estrictas de ciberseguridad y transparencia en el manejo de datos para cumplir con las regulaciones y mantener la confianza de los usuarios.",
                videoUrl: null
                }
            ],
            questions: [
                {
                id: "q6",
                question: "¿Qué tecnología es clave en el futuro de las plataformas digitales?",
                options: ["Realidad virtual", "Inteligencia artificial", "Blockchain", "Redes sociales"],
                correctAnswer: 1
                },
                {
                id: "q7",
                question: "¿Qué es uno de los mayores desafíos para las plataformas digitales?",
                options: ["Privacidad de datos", "Facilidad de uso", "Accesibilidad", "Capacidad de almacenamiento"],
                correctAnswer: 0
                }
            ]
            }
        ];
        

        // Simula el retraso de la respuesta del servidor
        setTimeout(() => {
            setCourseContent(simulatedData);
        }, 1000);
        };

        fetchCourseContent();
    }, []);

    const handleModuleClick = (course) => {
        console.log("Módulo seleccionado:", course.name);
        // Aquí puedes realizar una acción, como redireccionar a otra página o cargar información del módulo
    };

    return (
        <>
        {courseContent.length != 0 ? (
            <div className="absolute " >
            <Sheet >
                <SheetTrigger asChild >
                <Button variant="ghost" > 
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <ChevronRight /> 
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Menú de Módulos.</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className=" max-w-md  overflow-y-scroll scrollbar-hide">
                <SheetHeader>
                    <SheetTitle>Módulos disponibles</SheetTitle>
                    <SheetDescription>
                    Módulos del curo: <b>{ name }</b>
                    </SheetDescription>
                </SheetHeader>
                {/* Contenedor con scroll oculto */}
                <div className="grid gap-4 py-4 ">
                    {courseContent.length !== 0 ? (
                    courseContent.map((course, index) => (
                        <button
                        key={index}
                        className="flex items-center gap-3 hover:bg-gray-200 w-full text-left p-2 rounded dark:hover:bg-gray-700"
                        onClick={ () => setModule(index)}
                        >
                        {/* Circulito fijo, sin deformarse */}
                        <div className="w-4 h-4 bg-gray-500 rounded-full flex-shrink-0"></div>
                        <span >{course.name}</span>
                        </button>
                    ))
                    ) : null}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                    <Button variant="outline" className="w-full">Cerrar</Button>
                    </SheetClose>
                </SheetFooter>
                </SheetContent>
            </Sheet>
            </div>
        ) : null}
        {/* Contenido principal */}
        {courseContent.length === 0 ? (
            <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
            <ProgressBar />
            <div>
                <h1 className="text-3xl font-bold text-center">Cargando Información..</h1>
            </div>
            
            </div>
        ) : (
            <div className=" px-16 mb-10">
            {courseContent[module]?.content ? (
            <div>

            
            
            
                {courseContent[module].content.map((content, index) => (
                <div key={index} className="mb-10">

                
                    <h1 className="text-2xl font-bold">{content?.subTitle ?? null} 
                    </h1>
                    <p className="mt-4">{content?.text ?? null}</p>

                
                    {/* Renderiza el video */}
                    <div className="mt-4 flex justify-center sm:w-full md:full lg:full xl:px-32" >
                    {content?.videoUrl ? (
                        <div className="relative w-full " style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            style={{borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
                            className="absolute top-0 left-0 w-full h-full"
                            src={content.videoUrl.replace('watch?v=', 'embed/')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        </div>
                    ) : null}
                    </div>
                </div>
                ))}
                {/* Renderiza las preguntas */}
                <Card className="flex flex-col justify-between mx-auto mt-5 w-full w-full sm:w-full ">
                <CardHeader>
                    <CardTitle>Preguntas:</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={`gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-${Math.min(courseContent[module].questions.length, 2)} lg:grid-cols-${Math.min(courseContent[module].questions.length, 3)} h-full`}>
                    {courseContent[module].questions.map((question, index) => (
                        <div key={index} className="flex flex-col mb-6">
                        <strong className="mb-2">{question.question}</strong>
                        <RadioGroup className="flex flex-col gap-3 mt-2">
                            {question.options.map((option, index) => (
                            <div key={index} className=" items-start">
                                {/* Usas el index dinámicamente para generar el ID */}
                                <RadioGroupItem className="mr-1"
                                id={`option-${question.id}-${index}`}
                                value={index.toString()}
                                />
                                {/* El htmlFor ahora apunta correctamente al ID */}
                                <Label
                                className="leading-tight" // Asegura que el texto se ajuste bien
                                htmlFor={`option-${question.id}-${index}`}
                                >
                                {option}
                                </Label>
                            </div>
                            ))}
                        </RadioGroup>
                        </div>
                    ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button style={{ backgroundColor: "#303a53" }} className="w-full">
                    Verificar Respuesta
                    </Button>
                </CardFooter>
                </Card>

                <Pagination className="my-6">
                <PaginationContent className="select-none">
                    <PaginationPrevious
                        onClick={() => setModule(Math.max(module - 1, 0))}
                    />
                    
                    <PaginationNext
                        onClick={() => setModule(Math.min(module + 1, courseContent.length - 1))}
                    />
                </PaginationContent>
                </Pagination>
            </div>
            ) : (
                <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
                <div>
                    <h1 className="text-3xl font-bold text-center">No existe contenido del módulo...</h1>
                </div>
                
                </div>
            )}

                
            </div>
        )}
        </>
    );
}