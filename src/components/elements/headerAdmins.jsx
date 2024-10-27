import { useState, useEffect } from "react";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Factory } from "lucide-react";
import { useDarkMode } from '../../hooks/useDarkMode';
import { Switch } from "@/components/ui/switch";
export default function HeaderAdmin({title, organization}) {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <>
            <nav className="sticky top-0 z-30 relative static shadow-md h-auto ml-12 mb-2 flex py-2 px-4 items-center justify-between gap-4 border-b bg-background  ">
                {/* Título a la izquierda */}
                <h1 className="text-xl sm:text-3xl font-bold leading-none">{title}</h1>

                {/* Contenedor de los elementos alineados a la derecha */}
                <div className="flex items-center gap-4">
                    <p className="text-xs sm:text-base md:text-lg font-medium text-muted-foreground leading-none">
                        {organization}
                    </p>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full flex-shrink-0"
                        >
                            <Factory className="h-5 w-5" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mi Empresa</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Configuración</DropdownMenuItem>
                        <DropdownMenuItem>Asistencia</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className=" hidden sm:flex items-center space-x-2">
                        <span className="text-gray-600 dark:text-gray-400">🌞</span>
                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode}  className="dark:bg-secondary border-gray-200 dark:border-gray-700" />
                        <span className="text-gray-600 dark:text-gray-400">🌜</span>
                    </div> 
                </div>
            </nav>
        </>
    );
}
