import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/elementos/navbar";
import ComboContry from "@/components/elementos/comboCountry";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Alert,AlertDescription,AlertTitle,} from "@/components/ui/alert"
import { useNavigate } from 'react-router-dom';

export default function LoginRegister() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student"); // Estado para manejar la selección del tipo de usuario
  const [alertData, setAlertData] = useState(null);
  // Estados para almacenar los valores de los inputs de login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Estados para almacenar los valores de los inputs de register
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    country: "",
    grade: "none",
    organizationName: "",
    address: "",
    rfc: "",
    regFiscal: "",
    fiscalAddress: "",
    memberId: "",
  });

  // Función para validar campos vacíos de login
  const validateLogin = () => {
    if (!loginData.email || !loginData.password) {
      return false;
    }

    if(loginData.email){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginData.email)) {
        return 'email';
      }
    }

    if(loginData.password){
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(loginData.password)) {
        return 'password';
      }
    }
    return true;
  };
  
  // Función para validar campos vacíos de register
  const validateRegister = () => {
    if(registerData.email){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerData.email)) {
        return 'email';
      }
    }

    if(registerData.password){
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(registerData.password)) {
        return 'password';
      }
    }
    
    if (userType === "student" && registerData.age ) {
        const age = parseFloat(registerData.age); // Convierte age a un número de punto flotante

        // Verifica si age es un número entero, positivo y dentro del rango deseado
        if (!Number.isInteger(age) || age <= 0 || age >= 100) {
            return 'age'; // Retorna 'age' si la validación falla
        }
    }

    if (!registerData.email || !registerData.password || !registerData.name || !registerData.country) {
      return false;
    }

    if (userType === "student" && (!registerData.age || !registerData.grade)) {
      return false;
    }
    
    if (userType === "organization" && (!registerData.organizationName || !registerData.address || !registerData.rfc || !registerData.regFiscal || !registerData.fiscalAddress)) {
      return false;
    }
    
    if (userType === "member" && !registerData.memberId) {
      return false;
    }
    
    return true;
  };

  // Función para manejar los cambios en los inputs de login
  const handleLoginInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  // Función para manejar los cambios en los inputs de register
  const handleRegisterInputChange = (e) => {
    const { id, value } = e.target;
    setRegisterData({ ...registerData, [id]: value });
  };

  // Función para manejar el login
  const handleLoginSubmit = () => {
    if (!validateLogin()) {
      setAlertData({ type: "error", message: "Por favor, completa todos los campos de login." });
      return;
    }
    if (validateLogin() === 'email') {
      setAlertData({ type: "error", message: "Por favor, coloque un correo valido." });
      return;
    }
    if (validateLogin() === 'password') {
      setAlertData({ type: "error", message: "Verifique que su contraseña."  });
      return;
    }
      console.log("Login Data:", loginData);
      setAlertData(null); // Si todo está bien, ocultar alerta

      // Aquí puedes hacer la petición al servidor
      
      navigate('/courses');
      
  };

  // Función para manejar el registro
  const handleRegisterSubmit = () => {
    if (validateRegister() === 'age') {
        setAlertData({ type: "error", message: "Por favor, coloque una edad valida." });
        return;
    }
    if (validateRegister() === 'email') {
        setAlertData({ type: "error", message: "Por favor, coloque un correo valido." });
        return;
    }
    if (validateRegister() === 'password') {
        setAlertData({ type: "error", message: "Requisitos de la Contraseña:\n- Mínimo 8 caracteres.\n- Al menos un número (0-9).\n- Al menos una letra mayúscula (A-Z).\n- Al menos una letra minúscula (a-z)."  });
        return;
    }
    if (!validateRegister()) {
        setAlertData({ type: "error", message: "Por favor, completa todos los campos del registro." });
        return;
    }
    console.log("Register Data:", { ...registerData, userType });
    setAlertData(null); // Si todo está bien, ocultar alerta

    // Aquí puedes hacer la petición al servidor
    if (userType === "student") {
      navigate('/courses');
    }else if(userType === "organization"){
      navigate('/courses');
    }else if(userType === "member"){
      navigate('/courses');
    }
    
  };

  // Manejar cambios en ComboCountry
  const handleCountryChange = (value) => {
    setRegisterData({ ...registerData, country: value });
  };

  useEffect(() => {
    if (alertData && alertData.type === "error") {
      const timeoutId = setTimeout(() => {
        setAlertData(null); // Limpia la alerta después de 3 segundos
      }, 2500);

      // Limpia el timeout si el componente se desmonta o si `alertData` cambia
      return () => clearTimeout(timeoutId);
    }
  }, [alertData]);

  return (
    <>
        <Navbar />
        <div className="fixed top-4 right-4 z-20 bg-white w-auto transition-opacity duration-500 ease-in-out" style={{ borderRadius: "10px"}}>
            {alertData && alertData.type === "error" && (
                <Alert style={{ borderRadius: "10px"}} variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{alertData.message.split('\n').map((line, index) => (
                    <span key={index}>{line}<br/></span> // Reemplaza \n con <br />
                ))}</AlertDescription>
                </Alert>
            )}
        </div>


        <div className="py-10 px-10 flex flex-col gap-4 md:flex-row justify-center">
            
            <div>
            <img style={{ borderRadius: "20px" }} src="/assets/images/imgEscribir.jpg" alt="" />
            </div>

            <Tabs defaultValue="login" className="w-full md:w-[50%] overflow-y-auto max-h-[550px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Inicia Sesión</TabsTrigger>
                <TabsTrigger value="register">Regístrate</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
                <Card>
                <CardHeader>
                    <CardTitle>Inicia Sesión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    
                    <div className="space-y-1">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" placeholder="abc1@example.com" value={loginData.email} onChange={handleLoginInputChange} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" placeholder="*******"  minLength={8} value={loginData.password} onChange={handleLoginInputChange} />
                    </div>
                </CardContent>
                <CardFooter>
                        <Button className="w-full" id="login" onClick={handleLoginSubmit}>
                            Inicia Sesión
                        </Button>
                </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="register">
                <Card>
                <CardHeader>
                    <CardTitle>Regístrate</CardTitle>
                    <CardDescription>
                    Regístrate para acceder a todos los beneficios y cursos disponibles.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 overflow-y-auto max-h-[300px] show-scrollbar">
                    <div className="space-y-1">
                    <Label >Soy...</Label>
                    <Select  defaultValue="student" onValueChange={setUserType}>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="..." />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectItem value="student">Estudiante</SelectItem>
                            <SelectItem value="organization">Organización</SelectItem>
                            <SelectItem value="member">Miembro de Organización</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>

                    {(userType === "student" || userType === "member") && (
                    <>
                        <div className="space-y-1">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" type="text" placeholder="Mauricio Martínez Rodríguez" value={registerData.name} onChange={handleRegisterInputChange}  />
                        </div>
                        <div className="space-y-1">
                        <Label>País</Label>
                        <ComboContry  value={registerData.country} onChange={handleCountryChange} />
                        </div>
                    </>
                    )}

                    {userType === "student" && (
                    <>
                        <div className="space-y-1">
                            <Label htmlFor="age">Edad</Label>
                            <Input id="age" type="number" max="100" min="0" inputMode="numeric" pattern="\d*" value={registerData.age} onChange={handleRegisterInputChange}  />
                        </div>
                        <div className="space-y-1">
                            <Label>Grado de Estudio</Label>
                            <Select defaultValue="none" value={registerData.grade} onValueChange={(value) => setRegisterData({ ...registerData, grade: value })}>
                                <SelectTrigger className="w-full">
                                <SelectValue placeholder="..." />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="none">Ninguno</SelectItem>
                                    <SelectItem value="primaria">Primaria</SelectItem>
                                    <SelectItem value="secundaria">Secundaria</SelectItem>
                                    <SelectItem value="preparatoria">Preparatoria</SelectItem>
                                    <SelectItem value="universidad">Universidad</SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                    )}

                    {userType === "organization" && (
                    <>
                        <div className="space-y-1">
                            <Label htmlFor="organizationName">Nombre de la Organización</Label>
                            <Input id="organizationName" type="text" placeholder="Google SA de CV" value={registerData.organizationName} onChange={handleRegisterInputChange}  />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="address">Dirección de la Empresa</Label>
                            <Input id="address" type="text" placeholder="Calle 1 # 2-3" value={registerData.address} onChange={handleRegisterInputChange}  />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="rfc">RFC de la Empresa</Label>
                            <Input id="rfc" type="text" placeholder="AAA010101AAA" maxLength="14" value={registerData.rfc} onChange={handleRegisterInputChange}  />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="regFiscal">Régimen Fiscal</Label>
                            <Input id="regFiscal" type="text" placeholder="601 ABCD" value={registerData.regFiscal} onChange={handleRegisterInputChange}  />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="fiscalAddress">Dirección Fiscal</Label>
                            <Input id="fiscalAddress" type="text"  placeholder="Calle 1 # 2-3" value={registerData.fiscalAddress} onChange={handleRegisterInputChange}  />
                        </div>
                    </>
                    )}

                    {userType === "member" && (
                    <>
                        <div className="space-y-1">
                        <Label htmlFor="memberId">ID de Organización</Label>
                        <Input id="memberId" type="text" placeholder="123456ABCD" value={registerData.memberId} onChange={handleRegisterInputChange}  />
                        </div>
                    </>
                    )}

                    <div className="space-y-1">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="abc1@example.com" value={registerData.email} onChange={handleRegisterInputChange}  />
                    </div>

                    <div className="space-y-1">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" placeholder="*******"  minLength={8} value={registerData.password} onChange={handleRegisterInputChange}  />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button className="w-full" id="register" onClick={handleRegisterSubmit}>
                    Registrarse
                    </Button>
                </CardFooter>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
    </>
  );
}
