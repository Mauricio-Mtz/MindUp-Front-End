/* eslint-disable react/prop-types */
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CardSection({ 
  section, 
  subtitle, 
  text, 
  videoUrl, 
  module, 
  handleSectionChange, 
  setSection   
}) {
    const sendSection = async () => {
        //module -> content [] -> NuevaSection
        // Utiliza valores predeterminados si los inputs están vacíos
        var tempData = [];
        if(module?.content){
          module?.content.map( (item) => {
            console.log(item);
            tempData.push(item);
          })
        }
        const sectionData = {
          subTitle: section?.subTitle || subtitle || "",
          text: section?.text || text || "",
          videoUrl: section?.videoUrl || videoUrl || "",
        };
        if(sectionData.text == "" || sectionData.subTitle == "" ){
          toast.error("Escriba el subtitulo y el texto del contenido.");
          return;
        }
    
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
            toast.success("Seccion agregada correctamente");    
            console.log("Curso cargado:", result.rows);
            setSubtitle("");
            setText("");
            setVideoUrl("");
            setSection(null); 
            fetchCourse();
          } else {
            toast.error("Error en la respuesta del servidor.");
          }
        } catch (err) {
          toast.error("Error del servidor");
        }
    
    
        //console.log("Valores de la sección:", sendData);
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
        <Button
          variant="outline"
          className="w-[50%]"
          onClick={() => {
            setSection(null);
          }}
        >
          Limpiar
        </Button>
        <Button className="w-[50%]" onClick={sendSection}>
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
