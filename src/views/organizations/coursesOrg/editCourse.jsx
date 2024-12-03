import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";

import CardSection from "./components/CardSection";
import CardQuestion from "./components/CardQuestion";
import ListModule from "./components/ListModule";
import ListSection from "./components/ListSection";
import ListQuestions from "./components/ListQuestions";

const SERVER = import.meta.env.VITE_API_URL;

export default function EditCourse() {
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
  
  const location = useLocation();
  const { course } = location.state || {};

  const fetchCourse = async () => {
    if (!course?.id) return;
  
    try {
      const response = await fetch(`${SERVER}/content/getCourse/${course.id}`);
      const result = await response.json();
  
      if (result.success) {
        // Completely replace the existing data
        setData(result.data);
        setCourseName(result.data.name || "");
        
        // Reset other states if needed
        setModule(null);
        setModuleIndex(null);
        setSectionIndex(null);
        setQuestionIndex(null);
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
      setSection({ [key]: value });
    }
  };
  
  const handleQuestionChange = (key, value) => {
    setQuestion((prev) => {
      // If prev is null, create a new question object
      if (!prev) {
        return {
          question: key === 'question' ? value : '',
          options: ["", "", "", ""],
          correctAnswer: -1
        };
      }
  
      // If prev exists, update it normally
      return {
        ...prev,
        [key]: value
      };
    });
  };

  return (
    <div className="mt-4 mb-6 flex gap-4 flex-wrap sm:flex-nowrap">
      {/* Columna Principal */}
      <div className="sm:w-[60%] w-full h-fit space-y-4">
        {/* Input para el nombre del curso */}
        <Input
          className="w-full"
          disabled
          placeholder="Nombre del curso"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        {/* Card para contenido de la sección */}
        <CardSection
          section={section}
          sectionIndex={sectionIndex}
          course={data}

          module={module}

          handleSectionChange={handleSectionChange}
          setSection={setSection}

          fetchCourse={fetchCourse}
        />
        {/* Card para cuestionario */}
        <CardQuestion
          question={question}
          questionIndex={questionIndex}
          course={data}

          module={module}
          
          handleQuestionChange={handleQuestionChange}
          setQuestion={setQuestion}

          fetchCourse={fetchCourse}
        />
      </div>

      {/* Columna Secundaria */}
      <div className="sm:w-[40%] w-full space-y-4 h-fit">
        {/* Lista de Módulos */}
        <ListModule
          data={data}
          moduleIndex={moduleIndex}
          setModuleIndex={setModuleIndex}
          setModule={setModule}
          setSection={setSection}
          setSectionIndex={setSectionIndex}
          setQuestionIndex={setQuestionIndex}
          setQuestion={setQuestion}
          fetchCourse={fetchCourse}
          course={course}
          module={module}
        />

        {/* Lista secciones */}
        <ListSection
          moduleIndex={moduleIndex}
          data={data}
          sectionIndex={sectionIndex}
          setSection={setSection}
          setSectionIndex={setSectionIndex}
          module={module}
          fetchCourse={fetchCourse}
        />

        {/* lista Preguntas */}
        <ListQuestions
          moduleIndex={moduleIndex}
          data={data}
          questionIndex={questionIndex}
          setQuestion={setQuestion}
          setQuestionIndex={setQuestionIndex}
          module={module}
          fetchCourse={fetchCourse}
        />
      </div>
    </div>
  );
}
