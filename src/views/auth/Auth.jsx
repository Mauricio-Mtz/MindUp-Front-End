import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from "@/components/elements/navbar";
import Login from "./Login";
import Register from "./Register";
import RegisterData from './RegisterData'; // Importa el nuevo formulario

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ProgressCircle } from '@/components/elements/progressCircle';

const SERVER = import.meta.env.VITE_API_URL;

export default function Auth() {
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);
  const { toast } = useToast();
  const [showRegisterData, setShowRegisterData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (alertData) {
      if (alertData.type) {
        toast({
          description: alertData.description,
        });
      } else {
        toast({
          variant: "destructive",
          description: alertData.description,
        });
      }
    }
  }, [alertData, toast]);

  const handleLoginSubmit = (loginData) => {
    setLoading(true);
    fetch(`${SERVER}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(userData => {
        setAlertData({
            type: userData.success,
            description: userData.message
        });
        // Si todo salio bien, guardar los datos y pasar a la siguiente pantalla
        if (userData.success) {
          // Guarda los datos del usuario en localStorage
          localStorage.setItem('user', JSON.stringify(userData.data));
          // Redirige al usuario
          navigate('/catalog');
        }
        setLoading(false);
    })
    .catch(error => {
        console.error(error);
        setAlertData({
            type: false,
            description: error.message || "No se pudo completar el login."
        });
        setLoading(false);
    });
  };

  const handleRegisterSubmit = (registerData) => {
    setLoading(true);
    fetch(`${SERVER}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    .then(response => response.json())
    .then(userData => {
      setAlertData({
          type: userData.success,
          description: userData.message
      });
      if (userData.success) {
        localStorage.setItem('user', JSON.stringify(userData.data));
        setShowRegisterData(true);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setAlertData({ 
        type: false,
        description: "Hubo un problema al registrar el usuario."
      });
      setLoading(false);
    });
  };
  
  const handleRegisterDataSubmit = (completeRegisterData) => {
    setLoading(true);
    fetch(`${SERVER}/auth/complete-register`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completeRegisterData),
    })
    .then(response => response.json())
    .then(userData => {
      setAlertData({
        type: userData.success,
        description: userData.message
      });
      if (userData.success) {
        localStorage.setItem('user', JSON.stringify(userData.data));
        navigate('/catalog');
      }
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setAlertData({
        type: false,
        description: "Hubo un problema al completar los datos del usuario."
      });
      setLoading(false);
    });
  };

  return (
    <>
      {loading && 
      <div className='bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center'>
        <div className='flex w-32 items-center'>
          <h1 className="text-xl font-bold text-center">Cargando</h1>
          <ProgressCircle />
        </div>
      </div>
      }
      <Navbar />
      <div className="flex justify-center">
        <div className="flex justify-center p-5 gap-2 sm:max-w-full w-full">
          <div className="hidden lg:block">
            <img
              className="rounded-lg h-[510px] object-cover object-center"
              src="/assets/images/imgEscribir.jpg"
              alt="Imagen de Escribir"
            />
          </div>
            <Tabs defaultValue="login" className="h-[510px] sm:max-w-[400px] w-full">
            {showRegisterData ? (
              <RegisterData
                onRegisterSubmit={handleRegisterDataSubmit}
                setAlertData={setAlertData}
              />
            ) : (
              <>
                <TabsList className="flex justify-between border-b gap-2">
                  <TabsTrigger value="login" className="w-1/2 text-center border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500">
                    Inicia Sesión
                  </TabsTrigger>
                  <TabsTrigger value="register" className="w-1/2 text-center border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500">
                    Regístrate
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="h-[462px]">
                  <Login
                    onSubmit={handleLoginSubmit}
                    setAlertData={setAlertData}
                  />
                </TabsContent>
                <TabsContent value="register" className="h-[462px]">
                  <Register
                    onSubmit={handleRegisterSubmit}
                    setAlertData={setAlertData}
                  />
                </TabsContent>
              </>
            )}
            </Tabs>
        </div>
      </div>
    </>
  );
}
