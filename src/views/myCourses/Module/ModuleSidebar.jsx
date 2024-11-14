/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ModuleSidebar({ modules, setModule, course }) {
  console.log(course)
  const navigate = useNavigate();

  return (
    <div className="absolute">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ChevronRight />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Menú de Módulos.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="max-w-md overflow-y-scroll scrollbar-hide">
          <SheetHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate(`/my-courses/course/${course.name}`, { state: { course } })} ><FaArrowLeft/></Button>
              <SheetTitle>Curso de {course.name}</SheetTitle>
            </div>
            <SheetDescription>Módulos del curso: <b>{name}</b></SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {modules.map((module) => (
              <button
                key={module.id}
                className="flex items-center gap-3 hover:bg-gray-200 w-full text-left p-2 rounded dark:hover:bg-gray-700"
                onClick={() => setModule(module.id)}
              >
                <div className="w-4 h-4 bg-gray-500 rounded-full flex-shrink-0"></div>
                <span>{module.name}</span>
              </button>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="w-full">Cerrar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
