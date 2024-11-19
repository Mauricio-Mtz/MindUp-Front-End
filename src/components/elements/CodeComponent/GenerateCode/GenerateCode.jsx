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
    <div className="shadow-md rounded-lg my-4 text-center">
      <h2 className="text-xl font-bold mb-2">Código de Registro</h2>
      <p className="mb-4">
        Comparte este código con los miembros para que puedan registrarse en la organización:
      </p>
      <div className="flex justify-center gap-2 items-center">
        <div className="flex items-center gap-2 border rounded-sm  max-w-lg">
          <div className="font-mono text-lg  overflow-x-auto whitespace-nowrap">
            {isCodeVisible ? orgCode : maskedCode}
          </div>
          <Button
            variant="ghost"
            onClick={toggleCodeVisibility}
            className="rounded-sm shadow-md transition duration-300"
          >
            {isCodeVisible ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={handleCopyCode}
          className="rounded-sm shadow-md transition duration-300"
        >
          {copySuccess ? <FaCheck /> : <FaCopy />}
        </Button>
      </div>
    </div>
  );
}
