/* eslint-disable react/prop-types */
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export default function CardSection({ section, sectionIndex, course, module, handleSectionChange, setSection, fetchCourse }) {

  const sendSection = async () => {
    // Create a copy of existing content or start with an empty array
    const tempData = module?.content ? [...module.content] : [];
  
    const sectionData = {
      subTitle: section?.subTitle || "",
      text: section?.text || "",
      videoUrl: section?.videoUrl || "",
    };
  
    if(sectionData.text == "" || sectionData.subTitle == "" ){
      toast.error("Escriba el subtitulo y el texto del contenido.");
      return;
    }
    
    // If a specific section index is selected, replace that section
    // Otherwise, push a new section
    if (sectionIndex !== null) {      
      tempData[sectionIndex] = sectionData;
    } else {
      tempData.push(sectionData);
    }
  
    const sendData = {
      content: JSON.stringify(tempData),
      id: module.id || -1,
      courseId: course.id
    }
  
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
      const result = await response.json();
  
      if (result.success) {    
        toast.success("Seccion agregada correctamente");
        setSection(null); 
        fetchCourse();
      } else {
        toast.error("Error en la respuesta del servidor.");
      }
    } catch (err) {
      console.error("Error: ", err)
      toast.error("Error del servidor");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Añade contenido de la sección</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <form className="flex flex-col space-y-3">
          <Input
            className="w-full"
            value={section?.subTitle || ""}
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
              value={section?.text || ""}
              disabled={!module}
              onChange={(e) => handleSectionChange("text", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="url">URL para video didáctico</Label>
            <Input
              className="w-full"
              value={section?.videoUrl || ""}
              placeholder="https://www.youtube.com/..."
              id="url"
              disabled={!module}
              onChange={(e) => handleSectionChange("videoUrl", e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button
          variant="outline"
          className="w-[50%]"
          onClick={() => {
            setSection(null);
          }}
          disabled={!module}
        >
          Limpiar
        </Button>
        <Button 
          className="w-[50%]" 
          onClick={sendSection}
          disabled={!module}
        >
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
