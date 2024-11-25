/* eslint-disable react/prop-types */
import { BookOpenIcon, ClockIcon, TrendingUpIcon, Award, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StatCard = ({ icon: Icon, label, children, iconColor }) => (
  <div className="flex items-center space-x-4 p-4 rounded-lg bg-accent backdrop-blur-sm">
    <Icon className={`h-10 w-10 ${iconColor}`} />
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      {children}
    </div>
  </div>
);

export function CourseStats ({ course, courseProgress, levelRequirements }) {
    return (
        <Card className="w-full">
            <CardContent className="p-2">
                <div className="grid md:grid-cols-4 gap-2">
                    <StatCard
                        icon={BookOpenIcon}
                        label="Descripción"
                        iconColor="text-blue-500"
                    >
                        <p className="font-semibold">{course.description}</p>
                    </StatCard>

                    <StatCard
                        icon={TrendingUpIcon}
                        label="Progreso General"
                        iconColor="text-green-500"
                    >
                    <div className="flex items-center space-x-2">
                        <Progress value={courseProgress.progress || 0} className="flex-1" />
                        <span className="font-bold min-w-[3rem] text-right">
                            {courseProgress.progress || 0}%
                        </span>
                    </div>
                    </StatCard>

                    <StatCard
                        icon={ClockIcon}
                        label="Módulos"
                        iconColor="text-purple-500"
                    >
                        <Badge variant="secondary" className="text-base">
                            {course.modules?.length || 0} Módulos
                        </Badge>
                    </StatCard>

                    <StatCard
                        icon={Award}
                        label="Nivel Actual"
                        iconColor="text-yellow-500"
                    >
                        <div className="flex items-center space-x-2">
                            <Badge 
                                variant="secondary" 
                                className="text-lg bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                            >
                                Nivel {courseProgress.level || 1}
                            </Badge>
                            {levelRequirements?.canLevelUp && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>¡Listo para subir de nivel!</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            )}
                        </div>
                    </StatCard>
                </div>
            </CardContent>
        </Card>
    );
}