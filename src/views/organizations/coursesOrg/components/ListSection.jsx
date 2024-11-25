import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ListSection = ({
  moduleIndex,
  data,
  sectionIndex,
  setSection,
  setSectionIndex,
  setSubtitle,
  setText,
  setVideoUrl,
}) => {
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
        <Button
          className="w-full mt-4"
          onClick={() => {
            setSubtitle("");
            setText("");
            setVideoUrl("");
            setSection(null);
            setSectionIndex(null);
          }}
        >
          Añadir Sección
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListSection;
