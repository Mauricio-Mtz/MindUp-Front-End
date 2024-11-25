/* eslint-disable react/prop-types */
import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleCard } from "./ModuleCard";

export function ModulesSection ({ modulesByLevel, canAccessModule, getModuleStatus, courseProgress, onModuleClick }) {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Módulos del Curso</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(modulesByLevel).map(([level, modules]) => (
                    <div key={level} className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-semibold">Nivel {level}</h3>
                            {!canAccessModule(parseInt(level)) && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                <Lock className="h-4 w-4 mr-1" />
                                Bloqueado
                            </Badge>
                            )}
                        </div>
                        {modules.map(module => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                                status={getModuleStatus(module)}
                                progress={courseProgress.module_progress?.[module.id] || 0}
                                onClick={() => onModuleClick(module)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}