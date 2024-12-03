/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ModuleSidebar({ modules, setModule, course }) {
  const navigate = useNavigate();
  const sheetCloseRef = useRef(null);
  
  const statusStyles = {
    completed: {
      card: "border-emerald-500 bg-emerald-650/10",
      text: "text-emerald-500",
      icon: "text-emerald-300"
    },
    'in-progress': {
      card: "border-sky-500 bg-sky-650/10",
      text: "text-sky-500",
      icon: "text-sky-300"
    },
    locked: {
      card: "border-gray-700 bg-gray-950/10",
      text: "text-gray-700",
      icon: "text-gray-500"
    },
    available: {
      card: "border-indigo-500 bg-indigo-650/10",
      text: "text-indigo-500",
      icon: "text-indigo-300"
    }
  };

  const getModuleStatus = (module) => {
    if (module.disabled) return 'locked';
    if (module.progress === 100) return 'completed';
    if (module.progress > 0) return 'in-progress';
    return 'available';
  };
  
  const handleModuleSelect = (moduleId, status) => {
    if (status !== 'locked') {
      setModule(moduleId);
      // Programmatically close the sheet
      if (sheetCloseRef.current) {
        sheetCloseRef.current.click();
      }
    }
  };
  
  return (
    <div className="fixed left-4 border-y border-r rounded-r-md z-20 bg-background hover:bg-accent">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ChevronRight />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Menú de Módulos</p>
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
            <SheetDescription>Módulos del curso</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
          {modules.map((module) => {
              const status = getModuleStatus(module);
              const currentStyle = statusStyles[status];

              return (
                <div
                  key={module.id}
                  className={cn(
                    `transform transition-all duration-100 
                    hover:scale-105 hover:shadow-xl
                    border-2 rounded-lg p-2
                    ${currentStyle.card}
                    ${status !== 'locked' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
                    group`
                  )}
                  onClick={() => handleModuleSelect(module.id, status)}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-sm text-right ${currentStyle.text}`}>{module.progress}%</span>
                    <h3 className={`text-sm font-sans ${currentStyle.text} break-words w-full text-center`}>{module.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <SheetFooter>
            <SheetClose ref={sheetCloseRef} asChild>
              <Button variant="outline" className="w-full">Cerrar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}