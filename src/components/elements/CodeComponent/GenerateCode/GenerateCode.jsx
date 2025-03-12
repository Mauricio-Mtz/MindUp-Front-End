/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCopy, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function GenerateCode({ orgId, orgName }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  // Generar el código basado en el ID, nombre y fecha
  const generateOrgCode = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Fecha actual (YYYY-MM-DD)
    const orgData = {
      orgId: orgId,  // id de la organización
      orgName: orgName,  // nombre de la organización
      currentDate: currentDate,  // fecha actual
    };
  
    // Convertimos el objeto a una cadena JSON y luego la codificamos en Base64
    const rawCode = btoa(JSON.stringify(orgData)); 
    return rawCode;
  };  

  const orgCode = generateOrgCode();

  // Crear un código oculto que coincida en longitud con el código original
  const maskedCode = "•".repeat(orgCode.length);

  // Alternar la visibilidad del código
  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  // Copiar código al portapapeles
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(orgCode)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Mostrar mensaje por 2 segundos
      })
      .catch((err) => console.error("Error al copiar el código:", err));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 text-center">
      <h2 className="text-lg sm:text-xl font-bold mb-2">Código de Registro</h2>
      <p className="text-sm sm:text-base mb-4 px-2">
        Comparte este código con los miembros para que puedan registrarse en la organización:
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
        <div className="flex items-center w-full max-w-xs sm:max-w-lg border rounded-sm">
          <div className="flex-grow px-2 py-1 font-mono text-sm sm:text-base overflow-x-auto whitespace-nowrap">
            {isCodeVisible ? orgCode : maskedCode}
          </div>
          <Button
            variant="ghost"
            onClick={toggleCodeVisibility}
            className="rounded-sm shadow-md transition duration-300 p-2"
          >
            {isCodeVisible ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={handleCopyCode}
          className="rounded-sm shadow-md transition duration-300 w-full sm:w-auto"
        >
          {copySuccess ? <FaCheck /> : <FaCopy />}
        </Button>
      </div>
    </div>
  );
}