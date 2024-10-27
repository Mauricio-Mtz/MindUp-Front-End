import { useState, useEffect } from "react";
import { LogOut, Home, ScrollText, Users, BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate, useLocation } from 'react-router-dom';

export default function NabvarA({ setSelectedComponent }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(localStorage.getItem("selectedComponent") || "home");


    const handleSelect = (componentName) => {
        setSelected(componentName);
        setSelectedComponent(componentName);

    };

    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-40  w-14 flex-col border-r bg-background flex">
                <nav className="flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    onClick={() => handleSelect("home")}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 mb-1 cursor-pointer ${
                                    selected === "home"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <Home />
                                    <span className="sr-only">Home</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Inicio</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    onClick={() => handleSelect("courses")}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 mb-1 cursor-pointer ${
                                    selected === "courses" || selected === "edit" || selected === "add"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <BookOpen />
                                    <span className="sr-only">Course Manage</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Gestión de Cursos</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    onClick={() => handleSelect("reports")}
                                    className={`mb-1 flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 cursor-pointer ${
                                    selected === "reports"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <ScrollText />
                                    <span className="sr-only">Reports</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Reportes</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    onClick={() => handleSelect("members")}
                                    className={`mb-1 flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 cursor-pointer ${
                                    selected === "members"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <Users />
                                    <span className="sr-only">Members</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Miembros</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>

                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    onClick={() => navigate('/')}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 cursor-pointer"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="sr-only">LogOut</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Cerrar Sesión</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

        </>
    );
}
