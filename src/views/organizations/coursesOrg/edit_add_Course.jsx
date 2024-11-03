import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {data as simData} from "./dataEdit";
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation } from 'react-router-dom';

export default function EditAddCourse() {
  const [data, setData] = useState([]); // Estado para almacenar los datos de la tabla
  const [module, setModule] = useState();
  const [section, setSection] = useState([],);
  const [question, setQuestion] = useState([]);
  
  const [sectionIndex, setSectionIndex] = useState();
  const [questionIndex, setQuestionIndex] = useState();
  // Inicializa el estado. Si course no está definido, se establece un valor vacío.
  const [courseName, setCourseName] = useState("");

  const location = useLocation();
  const { course } = location.state || {}; // Accede a los datos del estado

  useEffect(() => {
    setTimeout(() => {
      setData(simData); // Simula la respuesta del servidor
    }, 1500); // 1.5 segundos de espera para simular la llamada
  }, []);

  useEffect(() => {
    console.log("course:", course);
    if (course) {
      setCourseName(course.name || ""); // Verifica si se recibe un curso y actualiza el estado si es necesario
    }
  }, [course]); // Este efecto se ejecuta cada vez que se recibe una nueva prop course

  const handleChange = (e) => {
    setCourseName(e.target.value); // Actualiza el estado con el valor del input
  };

  return (
    <>
      <div className="mt-4 mb-6 flex gap-4 flex-wrap sm:flex-nowrap"> 
        <div className="sm:w-[60%]  w-full h-fit space-y-4">
          
          <Input
            className="w-full"
            placeholder="Nombre del curso"
            value={courseName}
            onChange={handleChange}
          />
          
          <Card >
            <CardHeader>
              <CardTitle>Añade contenido de la sección</CardTitle>
            </CardHeader>
            <CardContent className=" pb-4">
              
              <form className="flex flex-col space-y-3">
                
                <Input className="w-full " value={section ? section.subTitle : ""} placeholder="Título de la sección"/>
                <div>              
                  <Label htmlFor="message">Contenido de la sección</Label>
                  <Textarea placeholder="Escribe el contenido de la sección del módulo" id="message" value={section ? section.text : ""}  className="show-scrollbar"/>
                </div>
                <div>              
                  <Label htmlFor="url">Url para video didactico</Label>
                  <Input className="w-full " value={section ? (section.videoUrl ? section.videoUrl : "") : ""}  placeholder="https://www.youtube.com/w..." id="url" onChange={(e) => setSection({...section, videoUrl: e.target.value})}/>          
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button variant="outline" className="w-[50%]">Limpiar</Button>
              <Button className="w-[50%]" >Añadir</Button>
            </CardFooter>
          </Card>

          <Card >
            <CardHeader>
              <CardTitle>Cuestionaro para el módulo</CardTitle>
            </CardHeader>
            <CardContent className=" pb-4">
              <form className="flex flex-col space-y-3">
                
                  <div>
                    <Label htmlFor="question">Pregunta</Label>
                    <Input className="w-full " placeholder="¿Qué es ...?" id="question" value={question ? (question.question ? question.question : "") : ""} onChange={(e) => setQuestion({...question, question: e.target.value})}/>
                  </div>                           
                
                  <div className="flex flex-col w-full space-y-2">
                    <Label htmlFor="option" className="">Opciones</Label>

                    <div className="w-full flex items-center justify-center">
                      <Input className="w-full" placeholder="Opción 1" id="option" value={question ? (question.options ? question.options[0] : "") : ""} onChange={(e) => setQuestion({...question, options: [e.target.value, question?.options?.[1], question?.options?.[2], question?.options?.[3]]})}/>
                      <Checkbox id="option" className="ml-2 h-full p-0 aspect-square" checked={question ? (question.correctAnswer || question.correctAnswer == 0 ? question.correctAnswer : 5 ) == 0 : false} onChange={(e) => setQuestion({...question, correctAnswer: e.target.checked ? 0 : 5})}/>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <Input className="w-full" placeholder="Opción 2" id="option" value={question ? (question.options  ? question.options[1] : "") : ""} onChange={(e) => setQuestion({...question, options: [question?.options?.[0], e.target.value, question?.options?.[2], question?.options?.[3]]})}/>
                      <Checkbox id="option" className="ml-2 h-full p-0 aspect-square" checked={question ? (question.correctAnswer ? question.correctAnswer : 5 ) == 1 : false} onChange={(e) => setQuestion({...question, correctAnswer: e.target.checked ? 1 : 5})}/>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <Input className="w-full" placeholder="Opción 3" id="option" value={question ? (question.options  ? question.options[2] : "") : ""} onChange={(e) => setQuestion({...question, options: [question?.options?.[0], question?.options?.[1], e.target.value, question?.options?.[3]]})}/>
                      <Checkbox id="option" className="ml-2 h-full p-0 aspect-square" checked={question ? (question.correctAnswer ? question.correctAnswer : 5 ) == 2 : false} onChange={(e) => setQuestion({...question, correctAnswer: e.target.checked ? 2 : 5})}/>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <Input className="w-full" placeholder="Opción 4" id="option" value={question ? (question.options  ? question.options[3] : "") : ""} onChange={(e) => setQuestion({...question, options: [question?.options?.[0], question?.options?.[1], question?.options?.[2], e.target.value]})}/>
                      <Checkbox id="option" className="ml-2 h-full p-0 aspect-square" checked={question ? (question.correctAnswer ? question.correctAnswer : 5 ) == 3 : false} onChange={(e) => setQuestion({...question, correctAnswer: e.target.checked ? 3 : 5})} />
                    </div>
                  </div>

              </form>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button className="w-full">Guardar</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="sm:w-[40%]  w-full space-y-4 h-fit">
          <Card>
            <CardHeader className="py-3">
              <CardTitle>Lista de Módulos</CardTitle>
            </CardHeader>
            <CardContent className=" pb-4 px-2 flex flex-col">
              <div className= " max-h-[220px] overflow-y-auto show-scrollbar">
                {data.length ? ( // Verifica si courseName no está vacío
                  <div>
                    {data.map((course, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 hover:bg-gray-200 w-full text-left p-1 rounded dark:hover:bg-gray-700"
                        onClick={() => {
                          setModule(index);
                          setSection(null);
                          setQuestion(null);
                        }}
                      >
                        {/* Circulito fijo, sin deformarse */}
                        <div className={`w-4 h-4  ${module === index ? "bg-primary":"bg-gray-500"} rounded-full flex-shrink-0`}></div>
                        <span >{course.name}</span>
                      </button>
                    ))}                                                         
                  </div>
                ) : (
                  <div>
                    {courseName !== "" ? (
                      <div className="space-y-2 w-full justify-center text-center">
                        <p>Cargando...</p>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ) : (
                      <div className="space-y-2 w-full justify-center text-center">
                        <p>No exite ningún módulo</p>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    )}
                  </div>
                  
                )}
                                                                
              </div>
            </CardContent>
          </Card>


          <Card >
            <CardHeader className="py-3">
              <CardTitle>Secciones por módulo</CardTitle>
            </CardHeader>
            <CardContent className=" pb-4 px-2 flex flex-col">
              <div className=" max-h-[220px] overflow-y-auto show-scrollbar">
                {module != null ? ( // Verifica si courseName no está vacío
                  <div>
                    {data[module]?.content?.map((content, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 hover:bg-gray-200 w-full text-left p-1 rounded dark:hover:bg-gray-700"
                        onClick={ () => {
                          setSection(content) 
                          setSectionIndex(index) 
                        } }
                      >
                        {/* Circulito fijo, sin deformarse */}
                        <div className={`w-4 h-4  ${sectionIndex === index ? "bg-primary":"bg-gray-500"} rounded-full flex-shrink-0`}></div>
                        <span >{content.subTitle}</span>
                      </button>
                    ))}
                  </div>
                  
                ) : (
                  <div>
                    {courseName !== "" ? (
                      <div className="space-y-2 w-full justify-center text-center">
                        <p>Seleccione un módulo</p>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ) : (
                      <div className="space-y-2 w-full justify-center text-center">
                        <p>No exite ningún módulo</p>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    )}
                  </div>
                )}
                
                                
              </div>
            </CardContent>
          </Card>
          
          <Card >
            <CardHeader className="py-3">
              <CardTitle>Preguntas por módulo</CardTitle>
            </CardHeader>
            <CardContent className=" pb-4 px-2 flex flex-col">
              <div className=" max-h-[220px] overflow-y-auto show-scrollbar">
                {module != null ? ( // Verifica si courseName no está vacío
                  <div>
                    {data[module]?.questions?.map((content, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 hover:bg-gray-200 w-full text-left p-1 rounded dark:hover:bg-gray-700"
                        onClick={ () => {
                          setQuestionIndex(index) 
                          setQuestion(content)}}
                      >
                        {/* Circulito fijo, sin deformarse */}
                        <div className={`w-4 h-4  ${questionIndex === index ? "bg-primary":"bg-gray-500"} rounded-full flex-shrink-0`}></div>
                        <span >{content.question}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    {courseName !== "" ? (
                      <div className="space-y-2 w-full justify-center text-center">
                        <p>Seleccione un módulo</p>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ) : (
                      <div className="space-y-2 w-full justify-center text-center">
                        <p>No exite ningún módulo</p>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    )}
                  </div>
                )}

                
              </div>
            </CardContent>
          </Card>
        </div>

        
      </div>

      {courseName !== "" ? ( // Verifica si courseName no está vacío
        <h1>editar {courseName}</h1>
      ) : (
        <div>
          <h1>crear</h1>
        </div>
      )}
    </>
  );
}
