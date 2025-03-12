import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function InputSearch() {
  const [cursoS, setCursoS] = useState(""); // Estado para almacenar la búsqueda
  const navigate = useNavigate(); // Hook para redirigir

  const handleInputChange = (event) => {
    setCursoS(event.target.value); // Actualiza el estado al escribir
  };

  const handleSearch = () => {
    if (cursoS.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(cursoS)}`); // Redirige con el valor de búsqueda
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Realiza la búsqueda al presionar Enter
    }
  };

  return (
    <div className="md:flex flex-1 relative">
      <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <Input
        style={{ borderRadius: "80px" }}
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
