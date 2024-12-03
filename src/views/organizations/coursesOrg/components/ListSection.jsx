/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const SERVER = import.meta.env.VITE_API_URL;

const ListSection = ({ moduleIndex, data, sectionIndex, setSection, setSectionIndex, module, fetchCourse }) => {
  
  const deleteSection = async () => {
    try {
      const response = await fetch(`${SERVER}/content/delete-section/${sectionIndex}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleId: module.id
        }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        fetchCourse();
        setSectionIndex(null)
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error del servidor");
    }
  };

  return (
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
        <div className="flex flex-row gap-2">
          <Button
            className="w-full mt-4"
            disabled={!module}
            onClick={() => {
              setSection(null);
              setSectionIndex(null);
            }}
          >
            Añadir Sección
          </Button>
          {sectionIndex != null && (
            <Button
              onClick={deleteSection}
              className="w-full mt-4 bg-red-600 hover:bg-red-700"
            >
              Eliminar Sección
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListSection;
