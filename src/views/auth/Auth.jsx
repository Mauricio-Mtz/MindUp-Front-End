import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from "@/components/elementos/navbar";
import Login from "./Login";
import Register from "./Register";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Auth() {
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    if (alertData && alertData.type === "error") {
      const timeoutId = setTimeout(() => {
        setAlertData(null); // Limpia la alerta después de 3 segundos
      }, 2500);

      // Limpia el timeout si el componente se desmonta o si `alertData` cambia
      return () => clearTimeout(timeoutId);
    }
  }, [alertData]);

  // Función para manejar el login
  const handleLoginSubmit = (loginData) => {
    console.log("Login Data:", loginData);
    setAlertData(null); // Si todo está bien, ocultar alerta

    // Aquí puedes hacer la petición al servidor  
    navigate('/courses');
  };

  // Función para manejar el registro
  const handleRegisterSubmit = (registerData) => {
    console.log("Login Data:", registerData);
    setAlertData(null); // Si todo está bien, ocultar alerta

    // Aquí puedes hacer la petición al servidor
    if (registerData.type === "student") {
      navigate('/courses');
    }else if(registerData.type === "organization"){
      navigate('/courses');
    }else if(registerData.type === "member"){
      navigate('/courses');
    }
    
  };

  return (
    <>
        <Navbar />
        <div className='flex justify-center'>
            <div className="flex justify-center p-5 gap-2 sm:max-w-full w-full">
                {/* Sección de Imagen */}
                <div className="hidden lg:block">
                    <img 
                    className="rounded-lg h-[500px] object-cover object-center" 
                    src="/assets/images/imgEscribir.jpg" 
                    alt="Imagen de Escribir" 
                    />
                </div>

                {/* Sección de Tabs */}
                <Tabs defaultValue="login" className="h-[500px] sm:max-w-[400px] w-full">
                    {/* Contenedor de los triggers de los tabs */}
                    <TabsList className="flex justify-between border-b gap-2">
                        <TabsTrigger value="login" className="w-1/2 text-center border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500">
                          Inicia Sesión
                        </TabsTrigger>
                        <TabsTrigger value="register" className="w-1/2 text-center border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500">
                          Regístrate
                        </TabsTrigger>
                    </TabsList>

                    {/* Contenido de Login */}
                    <TabsContent value="login" className="h-[452px]">
                        <Login
                        onLoginSubmit={handleLoginSubmit}
                        setAlertData={setAlertData}
                        />
                    </TabsContent>

                    {/* Contenido de Registro */}
                    <TabsContent value="register" className="h-[452px]">
                        <Register
                        onRegisterSubmit={handleRegisterSubmit}
                        setAlertData={setAlertData}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
        <div className="fixed top-4 right-4 z-20 bg-white w-auto transition-opacity duration-500 ease-in-out" style={{ borderRadius: "10px" }}>
            {alertData && alertData.type === "error" && (
            <Alert style={{ borderRadius: "10px" }} variant="destructive">
                <AlertTitle>{alertData.type}</AlertTitle>
                <AlertDescription>
                    {alertData.message.split('\n').map((line, index) => (
                        <span key={index}>{line}<br /></span>
                    ))}
                </AlertDescription>
            </Alert>
            )}
        </div>
    </>
  );
}
