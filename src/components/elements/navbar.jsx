import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircleUser, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useDarkMode } from '../../hooks/useDarkMode';
import InputSerch from "./inputSerch";

export default function Navbar() {
    const navigate = useNavigate();
    
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, []);

    return (
        <nav className="sticky top-0 z-30 bg-white dark:bg-[#1F1F1F] mb-2 shadow-md py-2" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)" }}>
            <div className="flex items-center justify-between mx-auto px-2 sm:px-5 lg:px-10 xl:px-20">
                {/* Logo */}
                <div 
                    className="cursor-pointer font-bold text-lg text-white hidden sm:block" 
                    onClick={() => {
                        if (isLoggedIn) {
                            navigate('/catalog');
                        } else {
                            navigate('/');
                        }
                    }}
                >
                    <img src="/assets/images/minUP-logo.png" alt="logo" className="h-auto rounded-lg w-28 dark:hidden" />
                    <img src="/assets/images/minUP-logo-dark.png" alt="logo" className="h-auto hidden rounded-lg w-28 dark:block" />
                </div>

                <InputSerch />

                {/* Botones de navegación */}
                <div className="hidden items-center md:flex space-x-4">
                    {isLoggedIn ? (
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
                                    <DropdownMenuItem onClick={() => navigate('/account')}>Perfil</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/my-courses')}>Mis cursos</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/account/payments')}>Pagos</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        setIsLoggedIn(false);
                                        navigate('/');
                                    }}
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="outline" onClick={() => navigate(`/auth`)}>Inicia sesión / Registrate</Button>
                    )}
                    
                    <div className="flex items-center space-x-2">
                        <span className="dark:text-gray-400 text-gray-600">🌞</span>
                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} className="border-gray-200 dark:bg-secondary dark:border-gray-700" />
                        <span className="dark:text-gray-400 text-gray-600">🌜</span>
                    </div> 
                </div>

                {/* Menú para móviles */}
                <div className="flex items-center md:hidden">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button onClick={() => setIsMenuOpen(true)}>
                                <Menu className="h-6 text-white w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-4">
                            <nav className="flex flex-col space-y-4 h-full">
                                {/* Logo */}
                                <SheetTitle>
                                    <div 
                                        className="cursor-pointer font-bold text-lg text-white" 
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                navigate('/catalog');
                                            } else {
                                                navigate('/');
                                            }
                                        }}
                                    >
                                        <img src="/assets/images/minUP-logo.png" alt="logo" className="h-auto rounded-lg w-20 dark:hidden" />
                                        <img src="/assets/images/minUP-logo-dark.png" alt="logo" className="h-auto hidden rounded-lg w-20 dark:block" />
                                    </div>
                                </SheetTitle>
                                <h2 className="scroll-m-20 border-b pb-2 text-md font-semibold tracking-tight first:mt-0">Mi cuenta</h2>
                                {isLoggedIn ? (
                                    <>
                                        <Button variant="ghost" onClick={() => navigate('/account')}>Perfil</Button>
                                        <Button variant="ghost" onClick={() => navigate('/my-courses')}>Mis cursos</Button>
                                        <Button variant="ghost" onClick={() => navigate('/account/payments')}>Pagos</Button>
                                    </>
                                ) : (
                                    <Button onClick={() => navigate(`/auth`)}>Iniciar Sesión</Button>
                                )}
                                
                                <h2 className="scroll-m-20 border-b pb-2 text-md font-semibold tracking-tight first:mt-0">Configuración</h2>
                                <div className="flex items-center justify-between">
                                    <span>Tema</span>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className="dark:text-gray-400 text-gray-600">🌞</span>
                                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                                        <span className="dark:text-gray-400 text-gray-600">🌜</span>
                                    </div> 
                                </div>

                                <div className="flex-grow"></div>

                                {isLoggedIn && (
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            localStorage.removeItem('user');
                                            setIsLoggedIn(false);
                                            navigate('/');
                                        }}
                                    >
                                        Cerrar sesión
                                    </Button>
                                )}

                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
