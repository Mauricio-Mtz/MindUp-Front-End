/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ListModule = ({ data, moduleIndex, setModuleIndex, setModule, setSection, setSectionIndex, setQuestion, fetchCourse, course }) => {
  const [nameModule, setNameModule] = useState("");
  const [level, setLevel] = useState("");

  const SERVER = import.meta.env.VITE_API_URL;

  const sendModule = async () => {
    const sendData = {
      name: nameModule,
      level: level,
      courseId: course.id,
    };

    if (sendData.name === "" || sendData.level === "") {
      toast.error("Llene correctamente los campos del módulo");
      return;
    }

    try {
      const response = await fetch(`${SERVER}/content/addNewModule`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Módulo agregado correctamente!");
        fetchCourse();
      } else {
        toast.error("Error en la respuesta del servidor.");
      }
    } catch (err) {
      toast.error("Error del servidor");
    }
  };

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle>Lista de Módulos</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-2">
        <div className="max-h-[220px] overflow-y-auto show-scrollbar">
          {data?.modules?.length ? (
            data.modules.map((mod, index) => (
              <button
                key={index}
                className={`flex items-center gap-3 hover:bg-gray-500 w-full text-left p-1 rounded ${
                  moduleIndex === index ? "bg-primary/20" : ""
                }`}
                onClick={() => {
                  setModule(mod);
                  setModuleIndex(index);
                  setSection(null);
                  setSectionIndex(null);
                  setQuestion({
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: -1,
                  });
                }}
              >
                <div
                  className={`w-4 h-4 ${
                    moduleIndex === index ? "bg-primary" : "bg-gray-500"
                  } rounded-full`}
                ></div>
                <span>{mod.name}</span>
              </button>
            ))
          ) : (
            <Skeleton className="h-4 w-full" />
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4">Agregar Módulo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4">Agrega un nuevo Módulo</DialogTitle>
            </DialogHeader>
            <div>
              <div className="gap-2 flex flex-col mb-4">
                <Label>Nombre del Módulo</Label>
                <Input
                  placeholder="Nombre del Módulo"
                  className="col-span-3"
                  value={nameModule}
                  onChange={(e) => setNameModule(e.target.value)}
                />
              </div>
              <div className="gap-2 flex flex-col">
                <Label>Nivel del curso</Label>
                <Input
                  placeholder="1 - 10"
                  className="col-span-3"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </div>
              <div className="flex w-full">
                <Button onClick={sendModule} className="w-full mt-4">
                  Añadir <strong>+</strong>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ListModule;
