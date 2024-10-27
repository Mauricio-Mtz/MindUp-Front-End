import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function EditAddCourse({ course, title }) {
  // Inicializa el estado. Si course no está definido, se establece un valor vacío.
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    if (course) {
      setCourseName(course.name || ""); // Verifica si se recibe un curso y actualiza el estado si es necesario
      title("edit");
    }else{
      title("add");
    }
  }, [course]); // Este efecto se ejecuta cada vez que se recibe una nueva prop course

  const handleChange = (e) => {
    setCourseName(e.target.value); // Actualiza el estado con el valor del input
  };

  return (
    <div>
      <div className="w-full">
        <Input
          className="w-full sm:w-1/3"
          placeholder="Nombre del curso"
          value={courseName}
          onChange={handleChange}
        />
      </div>

      {courseName !== "" ? ( // Verifica si courseName no está vacío
        <h1>Hola {courseName}</h1>
      ) : (
        <div>
          <h1>Hola</h1>
        </div>
      )}
    </div>
  );
}
