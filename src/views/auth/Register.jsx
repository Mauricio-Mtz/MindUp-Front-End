/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';

export const Register = ({ onSubmit, setAlertData }) => {
    const [registerData, setRegisterData] = useState({
        typeUser: "none",
        typeRegister: "native",
        name: null,
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setRegisterData({ ...registerData, [id]: value });
    };

    const validateRegister = () => {
        if (!registerData.typeUser || !registerData.email || !registerData.password) {
          setAlertData({ type: false, title: "Faltan campos", description: "Por favor, completa todos los campos de registro." });
          return false;
        }
        
        if (registerData.typeUser === "none") {
          setAlertData({ type: false, title: "Usuario faltante", description: "Por favor, coloque su tipo de usuario." });
          return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registerData.email)) {
          setAlertData({ type: false, title: "Correo inválido", description: "Por favor, coloque un correo válido." });
          return false;
        }
    
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(registerData.password)) {
          setAlertData({ type: false, title: "Contraseña inválida", description: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número." });
          return false;
        }
    
        return true;
    };

    const handleSubmit = () => {
        if (validateRegister()) {
            onSubmit(registerData);
        }
    };

    const registerGoogle = useGoogleLogin({
        onSuccess: (response) => {
            // Validar si el tipo de usuario ha sido seleccionado
            if (registerData.typeUser === "none") {
                setAlertData({ type: false, title: "Usuario faltante", description: "Por favor, seleccione su tipo de usuario antes de registrarse con Google." });
                return;
            }
    
            // console.log('Inicio de sesión exitoso:', response);
            // Verificar si se obtuvo el access_token
            if (response.access_token) {
                fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${response.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Error en la respuesta de usuario');
                    }
                    return res.json();
                })
                .then(userData => {
                    // Actualizar loginData para incluir la información de Google
                    const googleLoginData = {
                        typeRegister: "google",
                        typeUser: registerData.typeUser,
                        name: userData.name, // Asumiendo que el nombre está en userData
                        email: userData.email,
                        password: null, // No se usa la contraseña en el login de Google
                    };
    
                    // Enviar el objeto loginData al componente padre
                    onSubmit(googleLoginData);
                })
                .catch(error => {
                    console.error('Error al obtener los datos del usuario:', error);
                    setAlertData({ type: false, title: "Error", description: "No se pudo obtener los datos del usuario." });
                });
            } else {
                console.error('No se encontró el access_token en la respuesta.');
                setAlertData({ type: false, title: "Error", description: "No se pudo iniciar sesión." });
            }
        },
        onError: (error) => {
            console.log('Error al iniciar sesión:', error);
            setAlertData({ type: false, title: "Error", description: "Hubo un problema al iniciar sesión." });
        },
    });    

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Regístrate</CardTitle>
                <CardDescription>¡Regístrate ahora y accede a cursos!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
                <form className="space-y-2 flex flex-col justify-between h-full" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div>
                        <div className="space-y-1">
                            <Label>Soy...</Label>
                            <Select value={registerData.typeUser} onValueChange={(value) => setRegisterData({ ...registerData, typeUser: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="none">Seleccione una opción</SelectItem>
                                        <SelectItem value="student">Estudiante</SelectItem>
                                        <SelectItem value="member">Miembro de Organización</SelectItem>
                                        <SelectItem value="organization">Organización</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="abc1@example.com"
                                value={registerData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="*******"
                                minLength={8}
                                value={registerData.password}
                                onChange={handleInputChange}
                                />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-auto" id="register">
                        Registrar
                    </Button>
                </form>
                <div className='flex flex-col items-center mt-auto'>
                    <Button className="bg-white border hover:bg-slate-300 text-black w-full mt-2 flex items-center justify-between overflow-hidden whitespace-nowrap" onClick={registerGoogle}>
                        <img src="/assets/svg/google-logo.svg" alt="" width={"20px"} />
                        <span className="flex-1 text-center">Registrar con Google</span>
                    </Button>
                    <a className="text-sm text-muted-foreground text-blue-500" href="/politicas">Políticas de privacidad</a>
                </div>
            </CardContent>
        </Card>
    );
};

export default Register;
