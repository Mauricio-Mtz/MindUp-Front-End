import  { useState } from "react";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

export default function InputSearch() {
  const [cursoS, setCursoS] = useState(""); // Estado para almacenar la búsqueda

  const handleInputChange = (event) => {
    setCursoS(event.target.value); // Actualiza el estado al escribir
  };

  const handleSearch = () => {
    if (cursoS.trim()) {
      // Aquí puedes realizar la consulta al servidor
      console.log("Realizando búsqueda para:", cursoS);
      // Aquí podrías llamar a una función que realice la consulta, por ejemplo:
      // fetchData(cursoS);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Realiza la búsqueda al presionar Enter
    }
  };

  return (
    <div className="md:flex flex-1 mx-4 relative" >
      <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <Input style={{ borderRadius: "80px" }}
        type="search"
        placeholder="Busca tus cursos..."
        className="w-full pl-10 py-2 rounded-lg bg-background focus:outline-none"
        value={cursoS} // Asigna el valor del estado
        onChange={handleInputChange} // Maneja el cambio de entrada
        onKeyPress={handleKeyPress} // Maneja el evento de tecla
      />
    </div>
  );
}
