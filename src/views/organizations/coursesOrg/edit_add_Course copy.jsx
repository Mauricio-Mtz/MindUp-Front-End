import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {Card,CardContent,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";

const SERVER = import.meta.env.VITE_API_URL;

export default function EditAddCourse() {
  const [data, setData] = useState(null); // Almacena los datos completos del curso
  const [module, setModule] = useState(null); // Módulo seleccionado
  const [moduleIndex, setModuleIndex] = useState(null); // Índice del módulo seleccionado
  const [sectionIndex, setSectionIndex] = useState(null); // Índice de la sección seleccionada
  const [questionIndex, setQuestionIndex] = useState(null); // Índice de la pregunta seleccionada
  const [courseName, setCourseName] = useState(""); // Nombre del curso
  const [section, setSection] = useState(null); // Sección seleccionada
  const [question, setQuestion] = useState({
    question: "", // Título de la pregunta
    options: ["", "", "", ""], // Opciones por defecto
    correctAnswer: -1, // Índice de la respuesta correcta (-1 indica ninguna seleccionada)
  });

  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  //const [questions, setQuestions] = useState([]);

  const location = useLocation();
  const { course } = location.state || {};

  const fetchCourse = async () => {
    if (!course?.id) return;

    try {
      const response = await fetch(`${SERVER}/content/getCourse/${course.id}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setCourseName(result.data.name || ""); // Establece el nombre del curso
        console.log("Curso cargado:", result.data);
      } else {
        console.error("Error en la respuesta del servidor.");
      }
    } catch (err) {
      console.error("Error al cargar los datos del curso:", err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [course]);
  
  const handleSectionChange = (key, value) => {
    if (section) {
      setSection({ ...section, [key]: value });
    } else {
      // Si no hay una sección seleccionada, actualiza los valores locales predeterminados
      if (key === "subTitle") setSubtitle(value);
      if (key === "text") setText(value);
      if (key === "videoUrl") setVideoUrl(value);
    }
  };
  
  const handleQuestionChange = (key, value) => {
    setQuestion((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleOptionChange = (index, value) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }));
  };
  
  const handleCheckboxChange = (index) => {
    setQuestion((prev) => ({
      ...prev,
      correctAnswer: prev.correctAnswer === index ? -1 : index, // Permitir deseleccionar
    }));
  };

  const sendSection = async () => {
    //module -> content [] -> NuevaSection
    // Utiliza valores predeterminados si los inputs están vacíos
    var tempData = [];
    if(module){
      module.content.map( (item) => {
        console.log(item);
        tempData.push(item);
      })
    }
    const sectionData = {
      subTitle: section?.subTitle || subtitle || "",
      text: section?.text || text || "",
      videoUrl: section?.videoUrl || videoUrl || "",
    };

    if(section != null){
      module.content[sectionIndex] = sectionData;
    }else{
      
      tempData.push(sectionData);
    }
    
    const sendData = {
      content: JSON.stringify(tempData),
      id: module.id || -1,
      courseId: course.id
    }
    
    console.log('sendData: ', sectionData);
    try {
       const response = await fetch(
        `${SERVER}/content/addNewContent`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        }
      )
      //.then(response => response.json())
      //const response = await fetch(`${SERVER}/content/getCourse/${course.id}`);
      const result = await response.json();

      if (result.success) {        
        console.log("Curso cargado:", result.rows);
        setSubtitle("");
        setText("");
        setVideoUrl("");
        setSection(null); 
        fetchCourse();
      } else {
        console.error("Error en la respuesta del servidor.");
      }
    } catch (err) {
      console.error("Error del servidor", err);
    }


    //console.log("Valores de la sección:", sendData);
  };

  const sendQuestion = async () => {
    //acceder a module -> quiz {} -> questions [] -> finlQuestion 
    var tempData = [];

    
    if(module){
      module.quiz.questions.map( (item) => {
        tempData.push(item);
      })
    }

    const finalQuestion = {
      options: question.options.filter((opt, i) => opt !== '').map((opt, i) => opt),
      question: question.question || "",
      correctAnswer: question.correctAnswer >= 0 ? question.correctAnswer : -1,
    };

    if(questionIndex != null){      
      console.log('no ok')
      module.quiz.questions[questionIndex] = finalQuestion;
    }else{
      console.log('ok')
      tempData.push(finalQuestion);
    }
    
    const quizData = {
      questions: tempData,
      passing_score: module?.quiz?.passing_score || 0.85
    }
    const sendData = {
      quiz: JSON.stringify(quizData),
      id: module.id || -1,
      courseId: course.id
    }
    
    console.log('sendData: ', quizData);
    
    try {
      const response = await fetch(
       `${SERVER}/content/addNewQuestion`,{
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(sendData),
       }
     )
     //.then(response => response.json())
     //const response = await fetch(`${SERVER}/content/getCourse/${course.id}`);
     const result = await response.json();

      if (result.success) {        
        console.log("Curso cargado:", result.rows);
        setQuestion({
          question: "", // Título de la pregunta
          options: ["", "", "", ""], // Opciones por defecto
          correctAnswer: -1, // Índice de la respuesta correcta (-1 indica ninguna seleccionada)
        })
        fetchCourse();
      } else {
        console.error("Error en la respuesta del servidor.");
      }
    }catch (err) {
      console.error("Error del servidor", err);
    }
  };

  return (
    <div className="mt-4 mb-6 flex gap-4 flex-wrap sm:flex-nowrap">
      {/* Columna Principal */}
      <div className="sm:w-[60%] w-full h-fit space-y-4">
        {/* Input para el nombre del curso */}
        <Input
          className="w-full"
          placeholder="Nombre del curso"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        {/* Card para contenido de la sección */}
        <Card>
          <CardHeader>
            <CardTitle>Añade contenido de la sección</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <form className="flex flex-col space-y-3">
              <Input
                className="w-full"
                value={section?.subTitle || subtitle}
                placeholder="Título de la sección"
                disabled={!module}
                onChange={(e) => handleSectionChange("subTitle", e.target.value)}
              />
              <div>
                <Label htmlFor="message">Contenido de la sección</Label>
                <Textarea
                  placeholder="Escribe el contenido de la sección del módulo"
                  id="message"
                  className="show-scrollbar"
                  value={section?.text || text}
                  disabled={!module}
                  onChange={(e) => handleSectionChange("text", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="url">URL para video didáctico</Label>
                <Input
                  className="w-full"
                  value={section?.videoUrl || videoUrl}
                  disabled={!module}
                  placeholder="https://www.youtube.com/..."
                  id="url"
                  onChange={(e) => handleSectionChange("videoUrl", e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button variant="outline" className="w-[50%]" onClick={() => {setSection(null); setSectionIndex(null); }}>
              Limpiar
            </Button>
            <Button className="w-[50%]" onClick={sendSection}>Guardar</Button>
          </CardFooter>
        </Card>
        {/* Card para cuestionario */}
        <Card>
          <CardHeader>
            <CardTitle>Cuestionario para el módulo</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <form className="flex flex-col space-y-3">
              <Input
                className="w-full"
                placeholder="¿Qué es ...?"
                value={question?.question || ""}
                disabled={!module}
                onChange={(e) => handleQuestionChange("question", e.target.value)}
              />
              <div className="flex flex-col w-full space-y-2">
                <Label>Opciones</Label>
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="w-full flex items-center">
                    <Input
                      className="w-full"
                      placeholder={`Opción ${index + 1}`}
                      value={question?.options?.[index] || ""}
                      disabled={!module}
                      onChange={(e) =>
                        setQuestion({
                          ...question,
                          options: question.options.map((opt, i) =>
                            i === index ? e.target.value : opt
                          ),
                        })
                      }
                    />
                    <Checkbox
                      className="ml-2 h-full p-0 aspect-square"
                      checked={question?.correctAnswer === index}
                      onCheckedChange={(checked) =>
                        setQuestion({ ...question, correctAnswer: checked ? index : -1 })
                      }
                    />
                  </div>
                ))}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button className="w-full" onClick={sendQuestion}>Guardar</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Columna Secundaria */}
      <div className="sm:w-[40%] w-full space-y-4 h-fit">
        {/* Lista de Módulos */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle>Lista de Módulos</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-2">
            <div className="max-h-[220px] overflow-y-auto show-scrollbar">
              {data?.modules?.length ? (
                data.modules.map((mod, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-3 hover:bg-gray-500 w-full text-left p-1 rounded `}
                    onClick={() => {
                      setModule(mod);
                      setModuleIndex(index);
                      setSection(null);
                      setSectionIndex(null);
                      setQuestion({
                        question: "", // Título de la pregunta
                        options: ["", "", "", ""], // Opciones por defecto
                        correctAnswer: -1, // Índice de la respuesta correcta (-1 indica ninguna seleccionada)
                      });
                      setQuestionIndex(null);
                    }}
                  >
                    <div
                      className={`w-4 h-4 ${
                        moduleIndex === index ? "bg-primary" : "bg-gray-500"
                      } rounded-full`}
                    ></div>
                    <span>{mod.name}</span>
                  </button>
                ))
              ) : (
                <Skeleton className="h-4 w-full" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Secciones por módulo */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle>Secciones por módulo</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-2 flex flex-col">
            <div className="max-h-[220px] overflow-y-auto show-scrollbar">
              {moduleIndex !== null ? (
                data?.modules?.[moduleIndex]?.content?.map((content, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-3 hover:bg-gray-500 w-full text-left p-1 rounded`}
                    onClick={() => {
                      setSection(content);
                      setSectionIndex(index);
                    }}
                  >
                    <div
                      className={`w-4 h-4 ${
                        sectionIndex === index ? "bg-primary" : "bg-gray-500"
                      } rounded-full`}
                    ></div>
                    <span>{content.subTitle}</span>
                  </button>
                ))
              ) : (
                <div className="text-center">Seleccione un módulo</div>
              )}
            </div>
            <Button className="w-full mt-4" onClick={() =>{ 
              setSubtitle("");
              setText("");
              setVideoUrl("");
              setSection(null); 
              setSectionIndex(null); 
              }}
            >
              Añadir Sección
            </Button>
          </CardContent>
        </Card>

        {/* Preguntas por módulo */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle>Preguntas por módulo</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-2 flex flex-col">
            <div className="max-h-[220px] overflow-y-auto show-scrollbar">
            {moduleIndex !== null ? (
             
                  data?.modules?.[moduleIndex]?.quiz?.questions?.map((question, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-3 hover:bg-gray-500 w-full text-left p-1 rounded`}
                    onClick={() => {
                      setQuestion(question);
                      setQuestionIndex(index);
                    }}
                  >
                    <div
                      className={`w-4 h-4 ${
                        questionIndex === index ? "bg-primary" : "bg-gray-500"
                      } rounded-full`}
                    ></div>
                    <span>{question.question}</span>
                  </button>
                ))
                
                
                
              ) : (
                <div className="text-center">Seleccione un módulo</div>
              )}
              <Button className="w-full mt-4" onClick={() =>{ 
                setQuestion({
                  question: "", // Título de la pregunta
                  options: ["", "", "", ""], // Opciones por defecto
                  correctAnswer: -1, // Índice de la respuesta correcta (-1 indica ninguna seleccionada)
                });
                setQuestionIndex(null);
                }}
              >
                Añadir Pregunta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
