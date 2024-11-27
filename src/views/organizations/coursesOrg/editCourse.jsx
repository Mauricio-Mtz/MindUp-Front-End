import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
//import Componets
import CardSection from "./components/CardSection";
import CardQuestion from "./components/CardQuestion";
import ListModule from "./components/ListModule";
import ListSection from "./components/ListSection";
import ListQuestions from "./components/ListQuestions";
//url Server
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

  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

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
        // console.log("Curso cargado:", result.data);
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
  
  // const handleOptionChange = (index, value) => {
  //   setQuestion((prev) => ({
  //     ...prev,
  //     options: prev.options.map((opt, i) => (i === index ? value : opt)),
  //   }));
  // };
  
  // const handleCheckboxChange = (index) => {
  //   setQuestion((prev) => ({
  //     ...prev,
  //     correctAnswer: prev.correctAnswer === index ? -1 : index, // Permitir deseleccionar
  //   }));
  // };


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
        <CardSection
          section={section}
          subtitle={subtitle}
          text={text}
          videoUrl={videoUrl}
          module={module}
          handleSectionChange={handleSectionChange}
          setSection={setSection}
        />
        {/* Card para cuestionario */}
        <CardQuestion
          question={question}
          module={module}
          setQuestion={setQuestion}
          handleQuestionChange={handleQuestionChange}
          
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
          setQuestion={setQuestion}
          fetchCourse={fetchCourse}
          course={course}
        />

        {/* Lista secciones */}
        <ListSection
          moduleIndex={moduleIndex}
          data={data}
          sectionIndex={sectionIndex}
          setSection={setSection}
          setSectionIndex={setSectionIndex}
          setSubtitle={setSubtitle}
          setText={setText}
          setVideoUrl={setVideoUrl}
        />

        {/* lista Preguntas */}
        <ListQuestions
          moduleIndex={moduleIndex}
          data={data}
          questionIndex={questionIndex}
          setQuestion={setQuestion}
          setQuestionIndex={setQuestionIndex}
        />
      </div>
    </div>
  );
}
