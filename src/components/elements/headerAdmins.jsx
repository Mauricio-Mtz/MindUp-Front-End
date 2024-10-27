import { useState, useEffect } from "react";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Factory } from "lucide-react";
import { useDarkMode } from '../../hooks/useDarkMode';
import { Switch } from "@/components/ui/switch";
export default function HeaderAdmin() {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <>
            <nav className="sticky top-0 z-30 relative ml-12 static p-4 shadow-md mb-2  flex h-auto py-2  items-center justify-between gap-4 border-b bg-background px-4 sm:h-auto  px-6">
                {/* Título a la izquierda */}
                <h1 className="text-xl sm:text-3xl font-bold leading-none">Gestión de Cursos</h1>

                {/* Contenedor de los elementos alineados a la derecha */}
                <div className="flex items-center gap-4">
                <p className="text-xs sm:text-base md:text-lg font-medium text-muted-foreground leading-none">
                    Nombre de la empresa
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
