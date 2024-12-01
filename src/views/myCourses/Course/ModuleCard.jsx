/* eslint-disable react/prop-types */
import { Lock, Star, BookOpen } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ModuleCard({ module, status, progress, onClick }) {
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

  const currentStyle = statusStyles[status];

  return (
    <Card 
      className={cn(
        `transform transition-all duration-300 
        hover:scale-105 hover:shadow-xl
        border-2 ${currentStyle.card}
        ${status !== 'locked' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
        group`
      )}
      onClick={status !== 'locked' ? onClick : undefined}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg font-bold ${currentStyle.text} truncate`}>
            {module.name}
          </CardTitle>
          {status === 'locked' && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Lock className={`h-5 w-5 ${currentStyle.icon}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Necesitas subir de nivel para acceder</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {status === 'completed' && (
            <Star className={`h-6 w-6 ${currentStyle.icon} animate-pulse`} />
          )}
          {status === 'in-progress' && (
            <BookOpen className={`h-5 w-5 ${currentStyle.icon}`} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Progress 
              value={progress} 
              className="flex-1"
              indicatorClassName={cn(
                status === 'completed' && "bg-emerald-600",
                status === 'in-progress' && "bg-sky-600",
                status === 'locked' && "bg-gray-500"
              )}
            />
            <span className={`font-bold text-sm min-w-[3rem] text-right ${currentStyle.text}`}>
              {progress}%
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {status === 'in-progress' && (
              <Badge 
                variant="secondary" 
                className="bg-sky-800/20 text-sky-600 border-sky-600/30"
              >
                En progreso
              </Badge>
            )}
            {status === 'completed' && (
              <Badge 
                variant="secondary" 
                className="bg-emerald-800/20 text-emerald-600 border-emerald-600/30"
              >
                Completado
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={`${currentStyle.text} border-current/30`}
            >
              Nivel {module.level}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}