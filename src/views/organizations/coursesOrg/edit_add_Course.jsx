import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation } from 'react-router-dom';
import { ServerCrash } from "lucide-react";

const SERVER = import.meta.env.VITE_API_URL;

export default function EditAddCourse() {
  const [data, setData] = useState(null); // Estado para almacenar los datos de la tabla
  const [module, setModule] = useState();
  const [section, setSection] = useState([]);
  const [question, setQuestion] = useState([]);
  
  const [sectionIndex, setSectionIndex] = useState();
  const [questionIndex, setQuestionIndex] = useState();
  // Inicializa el estado. Si course no está definido, se establece un valor vacío.
  const [courseName, setCourseName] = useState("");

  const location = useLocation();
  const { course } = location.state || {}; // Accede a los datos del estado


 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${SERVER}/modules/getModulesDetails/${course.id}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
          console.log("Cursos obtenidos correctamente.", result.data);
        }
      } catch (err) {
        setData([]);
        console.log('Error al obtener los datos del curso',);
      } finally {
        console.log(true);
      }
    };

    if(course){
      setCourseName(course.name || ""); // Verifica si se recibe un curso y actualiza el estado si es necesario
      fetchCourse();
    }
  }, [course]);

  const handleChange = (e) => {
    setCourseName(e.target.value); // Actualiza el estado con el valor del input
  };

  const valueQuestion = (index, value) => {
    console.log('values e indexs: ',index, value);  
    if(value === index){
      return true
    }else{
      return false
    }
  };

  return (
    <>
      {data ? (      
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
                  
                  <Input className="w-full " value={section ? section.subTitle : ""} placeholder="Título de la sección" onChange={(e) => setSection({...section, subTitle: e.target.value})}/>
                  <div>              
                    <Label htmlFor="message">Contenido de la sección</Label>
                    <Textarea placeholder="Escribe el contenido de la sección del módulo" id="message" value={section ? section.text : ""}  className="show-scrollbar" onChange={(e) => setSection({...section, text: e.target.value})}/>
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
                      <Input className="w-full " placeholder="¿Qué es ...?" id="question" value ={question ? (question.question ? question.question : "") : ""} onChange={(e) => setQuestion({...question, question: e.target.value})}/>
                    </div>                           
                  
                    <div className="flex flex-col w-full space-y-2">
                      <Label htmlFor="option" className="">Opciones</Label>
                      {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="w-full flex items-center justify-center">
                          <Input
                            className="w-full"
                            placeholder={`Opción ${index + 1}`}
                            id={`option${index}`}
                            value={question ? (question.options ? question.options[index] : "") : ""}
                            onChange={(e) =>
                              setQuestion({
                                ...question,options: question.options.map((opt, i) => (i === index ? e.target.value : opt)),
                              })
                            }
                          />
                          {/* Checkbox para seleccionar/deseleccionar la respuesta correcta */}
                          <Checkbox
                            id={`checkbox${index}`}
                            className="ml-2 h-full p-0 aspect-square"
                            checked={valueQuestion(index, question ? (question.correctAnswer > -1 ? question.correctAnswer : "") : "")}
                            onCheckedChange={(checked) => {
                              setQuestion({
                                ...question, correctAnswer: checked ? index : -1
                              });
                            }}
                          />
                        </div>
                      ))}
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
                            setSection(null); setSectionIndex(null);
                            setQuestion(null); setQuestionIndex(null);
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
      ) : (
        <div className="flex flex-col w-full justify-center items-center ">
          <h2 className="text-2xl font-bold text-center">No se encontró información del curso <br/> CONTACTA AL ADMINISTRADOR. </h2>
          <div className="mt-4 ">
            <ServerCrash className="w-16 h-16"/>
          </div>
        </div>
      )}
    </>
  );
}
