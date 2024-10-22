import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '@/components/elements/navbar';
import { ProgressBar } from '@/components/elements/progressBar';
import { Button } from "@/components/ui/button";

export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [recommendedCourses, setRecommendedCourses] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const simulatedUserData = {
                namep: 'Carlos Beltran',
                email: 'carlossbel09@gmail.com',
                bio: 'Hola mundo',
                name: 'Carlos Amador',
                lastname: 'Beltran Angeles',
                phone: '+52 4411000629',
                edu: 'Universitario',
                profileImage: '/public/assets/images/profile.jpg',
            };

            const simulatedCourses = [
                { id: 1, name: 'Curso de Google', description: 'Aprende React desde cero.', img: '/public/assets/images/cursogoogle.png' },
                { id: 2, name: 'Curso de Python', description: 'Crea aplicaciones desde cero.', img: '/public/assets/images/cursopython.jpg' },
                { id: 3, name: 'Curso de Machine Learning', description: 'Adéntrate en el aprendizaje automático.', img: '/public/assets/images/cursoml.png' },
                { id: 1, name: 'Curso de Google', description: 'Aprende React desde cero.', img: '/public/assets/images/cursogoogle.png' },
                { id: 2, name: 'Curso de Python', description: 'Crea aplicaciones desde cero.', img: '/public/assets/images/cursopython.jpg' },
                { id: 3, name: 'Curso de Machine Learning', description: 'Adéntrate en el aprendizaje automático.', img: '/public/assets/images/cursoml.png' },
                { id: 1, name: 'Curso de Google', description: 'Aprende React desde cero.', img: '/public/assets/images/cursogoogle.png' },
                { id: 2, name: 'Curso de Python', description: 'Crea aplicaciones desde cero.', img: '/public/assets/images/cursopython.jpg' },
                { id: 3, name: 'Curso de Machine Learning', description: 'Adéntrate en el aprendizaje automático.', img: '/public/assets/images/cursoml.png' },
                { id: 1, name: 'Curso de Google', description: 'Aprende React desde cero.', img: '/public/assets/images/cursogoogle.png' },
                { id: 2, name: 'Curso de Python', description: 'Crea aplicaciones desde cero.', img: '/public/assets/images/cursopython.jpg' },
                { id: 3, name: 'Curso de Machine Learning', description: 'Adéntrate en el aprendizaje automático.', img: '/public/assets/images/cursoml.png' },
                { id: 1, name: 'Curso de Google', description: 'Aprende React desde cero.', img: '/public/assets/images/cursogoogle.png' },
                { id: 2, name: 'Curso de Python', description: 'Crea aplicaciones desde cero.', img: '/public/assets/images/cursopython.jpg' },
                { id: 3, name: 'Curso de Machine Learning', description: 'Adéntrate en el aprendizaje automático.', img: '/public/assets/images/cursoml.png' },
                { id: 1, name: 'Curso de Google', description: 'Aprende React desde cero.', img: '/public/assets/images/cursogoogle.png' },
                { id: 2, name: 'Curso de Python', description: 'Crea aplicaciones desde cero.', img: '/public/assets/images/cursopython.jpg' },
                { id: 3, name: 'Curso de Machine Learning', description: 'Adéntrate en el aprendizaje automático.', img: '/public/assets/images/cursoml.png' },
            ];

            setTimeout(() => {
                setUserData(simulatedUserData);
                setRecommendedCourses(simulatedCourses);
            }, 1000);
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
                <ProgressBar />
                <h1 className='text-3xl font-bold text-center'>Cargando Perfil...</h1>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col md:flex-row justify-center items-start px-20 mt-4'>
                <div className="flex-shrink-0">
                    <img 
                        src={userData.profileImage} 
                        alt="Perfil" 
                        className="w-80 h-80 object-cover rounded-full border-4 border-gray-300 shadow-lg"  
                    />
                </div>
                <div className='ml-6 flex flex-col flex-grow text-center md:text-left'>
                    <h1 className='text-3xl font-bold'>{userData.namep}</h1>
                    <p className='mt-1 text-gray-600'>{userData.bio}</p>
                    <p className='mt-2'>Nombre(s): <b>{userData.name}</b></p>
                    <p className='mt-2'>Apellidos: <b>{userData.lastname}</b></p>
                    <p className='mt-2'>Número de teléfono: <b>{userData.phone}</b></p>
                    <p className='mt-2'>Email: <b>{userData.email}</b></p>
                    <p className='mt-2'>Nivel Educativo: <b>{userData.edu}</b></p>

                    <div className="mt-4 flex flex-col items-start">
                        <Button onClick={() => navigate('/mycourses')} className="w-1/2 mb-2">Mis Cursos</Button>
                        <Button onClick={() => navigate('/edit-profile')} className="w-1/2">Editar Perfil</Button>
                    </div>
                </div>
                <div className='ml-6 w-1/3 h-[800px] overflow-y-auto border border-gray-300 rounded-md p-4'>
                    <h2 className='text-xl font-bold mb-2 text-center'>Cursos Recomendados</h2>
                    <ul>
                        {recommendedCourses.map(course => (
                            <li key={course.id} className="mb-2 flex items-center">
                                <img 
                                    src={course.img} 
                                    alt={course.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-2" 
                                />
                                <div className="p-2 flex-grow">
                                    <p className="font-semibold">{course.name}</p>
                                    <p>{course.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
