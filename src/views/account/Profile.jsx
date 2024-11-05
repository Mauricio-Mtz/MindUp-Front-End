import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDarkMode } from '@/hooks/useDarkMode';
import { ProgressCircle } from '@/components/elements/progressCircle';

const SERVER = import.meta.env.VITE_API_URL;

export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingInformation, setIsEditingInformation] = useState(false);
    const [formData, setFormData] = useState({});

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchUserData(user.email);
        RecommendedCourses();
    }, []);

    // console.log(formData.email)  
    console.log(userData)
    
    // Función para obtener los datos del usuario
    const fetchUserData = async (userEmail) => {
        fetch(`${SERVER}/users/getUser?email=${encodeURIComponent(userEmail)}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(userData => {
            // console.log(userData.data)
            setUserData(userData.data);
            setFormData(userData.data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }    

    // Función para obtener los cursos recomendados
    const RecommendedCourses= async () => {
        fetch(`${SERVER}/Courses/getRecomendedCourses`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(recommendedCourses => {
            setRecommendedCourses(recommendedCourses.data)
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateAccount = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/users/updateUser', {
                method: 'PUT',  // Usualmente PUT o PATCH para actualizaciones
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Datos de la cuenta actualizados:", result);
                setIsEditingAccount(false);  // Desactivar el modo de edición
            } else {
                console.error("Error al actualizar la cuenta:", response.statusText);
            }
        } catch (error) {
            console.error("Error de red al actualizar la cuenta:", error);
        }
    };

    const updateInformation = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/updateInformation', {
                method: 'PUT',  // Usualmente PUT o PATCH para actualizaciones
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: formData.fullname,
                    birthdate: formData.birthdate,
                    grade: formData.grade,
                    country: formData.country,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Información actualizada:", result);
                setIsEditingInformation(false);  // Desactivar el modo de edición
            } else {
                console.error("Error al actualizar la información:", response.statusText);
            }
        } catch (error) {
            console.error("Error de red al actualizar la información:", error);
        }
    };    

    return (
        <>
        {loading && 
            <div className='bg-black bg-opacity-30 fixed inset-0 flex justify-center items-center'>
                <div className='flex w-32 items-center'>
                    <h1 className="text-xl font-bold text-center">Cargando</h1>
                    <ProgressCircle />
                </div>
            </div>
        }
    
        {userData && (
            <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-4 h-[550px] w-full">
                <div className='h-full w-full md:w-8/12'>
                    <h2 className="scroll-m-20 border-b pb-2 text-center sm:text-left text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">Perfil</h2>
                    {/* Información del usuario */}
                    <ScrollArea className='h-full border-b'>
                        <form onSubmit={updateAccount} className="flex flex-col gap-2 mt-2 p-2 border rounded-md">
                            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Cuenta</h2>
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <Label htmlFor="correo">Correo</Label>
                                    <div className="w-full sm:w-3/4 flex">
                                        <Input 
                                            type="email" 
                                            name="email"
                                            value={formData.email} 
                                            onChange={handleInputChange}
                                            disabled={!isEditingEmail}
                                            className="w-full" 
                                            required 
                                        />
                                        <Button 
                                            type="button" 
                                            className="ml-2 bg-gray-500 text-white w-28"
                                            onClick={() => {
                                                setIsEditingEmail(!isEditingEmail);
                                                if (isEditingEmail) setFormData(userData); 
                                            }}
                                        >
                                            {isEditingEmail ? 'Cancelar' : 'Editar'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <Label htmlFor="contraseña">Contraseña</Label>
                                    <div className="w-full sm:w-3/4 flex">
                                        <Input 
                                            type="password" 
                                            name="password"
                                            value="********" 
                                            onChange={handleInputChange}
                                            disabled={!isEditingPassword}
                                            className="w-full" 
                                            required 
                                        />
                                        <Button 
                                            type="button" 
                                            className="ml-2 bg-gray-500 text-white w-28"
                                            onClick={() => {
                                                setIsEditingPassword(!isEditingPassword);
                                                if (isEditingPassword) setFormData(userData); 
                                            }}
                                        >
                                            {isEditingPassword ? 'Cancelar' : 'Editar'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 justify-end w-full">
                                {(isEditingEmail || isEditingPassword) && (
                                    <Button type="submit" className="w-full md:w-32 bg-green-500 text-white">
                                        Guardar Cambios
                                    </Button>
                                )}
                            </div>
                        </form>
                        <form onSubmit={updateInformation} className="flex flex-col gap-2 mt-2 p-2 border rounded-md">
                            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Información de usuario</h2>
                            <div className="space-y-2">
                                <div className="flex  text-left flex-col sm:flex-row justify-between items-center gap-2">
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <div className="w-full sm:w-3/4">
                                        <Input 
                                            type="text" 
                                            name="fullname"
                                            value={formData.fullname} 
                                            onChange={handleInputChange}
                                            disabled={!isEditingInformation}
                                            className="w-full" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <Label htmlFor="fecha-nacimiento">Fecha de nacimiento</Label>
                                    <div className="w-full sm:w-3/4">
                                        <Input 
                                            type="date" 
                                            name="birthdate"
                                            value={formData.birthdate} 
                                            onChange={handleInputChange}
                                            disabled={!isEditingInformation}
                                            className="w-full" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <Label htmlFor="grado-estudios">Grado de estudios</Label>
                                    <div className="w-full sm:w-3/4">
                                        <Input 
                                            type="text" 
                                            name="grade"
                                            value={formData.grade} 
                                            onChange={handleInputChange}
                                            disabled={!isEditingInformation}
                                            className="w-full" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <Label htmlFor="pais">País</Label>
                                    <div className="w-full sm:w-3/4">
                                        <Input 
                                            type="text" 
                                            name="country"
                                            value={formData.country} 
                                            onChange={handleInputChange}
                                            disabled={!isEditingInformation}
                                            className="w-full" 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 justify-end">
                                {isEditingInformation ? (
                                    <>
                                        <Button type="button" className="w-full md:w-32 bg-gray-300 text-black" onClick={() => {
                                            setIsEditingInformation(false);
                                            setFormData(userData);
                                        }}>Cancelar</Button>
                                        <Button type="submit" className="w-full md:w-32 bg-green-500 text-white">Aceptar</Button>
                                    </>
                                ) : (
                                    <Button type="button" className="w-full md:w-32 bg-gray-500 text-white" onClick={() => {setIsEditingInformation(!isEditingInformation)}}>Editar</Button>
                                )}
                            </div>
                        </form>
                        <div className="flex flex-col gap-2 mt-2 p-2 border rounded-md mb-2">
                            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Configuración</h2>
                            <div className="space-y-2">
                                <div className="flex text-left sm:flex-row justify-between items-center gap-2">
                                    <Label htmlFor="nombre">Tema</Label>
                                    <div className="w-full sm:w-3/4 flex justify-end">
                                        <span className="dark:text-gray-400 text-gray-600">🌞</span>
                                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                                        <span className="dark:text-gray-400 text-gray-600">🌜</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>  
    
                {/* Cursos recomendados */}
                <div className='hidden md:block h-full w-full md:w-4/12'>    
                    <h2 className="scroll-m-20 border-b pb-2 text-center sm:text-left text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">Recomendaciones</h2>
                    <ScrollArea className="h-full border-b">
                        <ul className="space-y-2 my-2">
                            {recommendedCourses.map(course => (
                                <Card
                                    className="w-full transition duration-300 hover:bg-gray-700 hover:text-white" 
                                    key={course.id} 
                                    onClick={() => navigate(`/catalog/course-detail/${course.name}`, { state: { course } })}
                                >
                                    <CardHeader>
                                        <div className="flex justify-between">
                                            <CardTitle>{course.name}</CardTitle>
                                            <CardDescription>Nivel: {course.level}</CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>
            </div>
        )}
    </>
    
    );
}
