import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useDarkMode } from '../../hooks/useDarkMode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputSerch from "./inputSerch";
import { Switch } from "@/components/ui/switch";

export default function Navbar() {
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/auth');  // Cambia '/nueva-ruta' por la ruta que necesites
    };

    return (
        <nav className="bg-white dark:bg-[#1F1F1F] p-4 shadow-md mb-2 " style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)"}}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-lg font-bold " onClick={() => navigate('/')}>
                    <img src="/assets/images/minUP-logo.png" alt="logo" className="w-28 h-auto rounded-lg cursor-pointer dark:hidden" />
                    <img src="/assets/images/minUP-logo-dark.png" alt="logo" className="w-28 h-auto rounded-lg cursor-pointer hidden dark:block" />
                </div>

                <InputSerch />

                {/* Botones de navegación */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Button variant="outline" onClick={goToLogin}>Inicia sesión / Registrate</Button>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Mi cuenta <CircleUser className="ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => {navigate('/profile')}}>Perfil</DropdownMenuItem>
                                <DropdownMenuItem>Mis Cursos</DropdownMenuItem>
                                <DropdownMenuItem>Pagos</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Modo oscuro */}
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600 dark:text-gray-400">🌞</span>
                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode}  className="dark:bg-secondary border-gray-200 dark:border-gray-700" />
                        <span className="text-gray-600 dark:text-gray-400">🌜</span>
                    </div> 
                </div>

                {/* Menú para móviles */}
                <div className="flex md:hidden items-center">
                    
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button  onClick={() => setIsMenuOpen(true)}>
                                <Menu className="h-6 w-6 text-white" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-4">
                            <SheetHeader>
                                <SheetTitle>Menú</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-4">
                                <Button variant="outline" onClick={goToLogin}>Iniciar Sesión</Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">Mi cuenta</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Perfil</DropdownMenuItem>
                                            <DropdownMenuItem>Mis Cursos</DropdownMenuItem>
                                            <DropdownMenuItem>Pagos</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Log out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                 <div className="flex w-full items-center space-x-2 align-center justify-center">
                                    <span className="text-gray-600 dark:text-gray-400">🌞</span>
                                    <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                                    <span className="text-gray-600 dark:text-gray-400">🌜</span>
                                </div> 
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
