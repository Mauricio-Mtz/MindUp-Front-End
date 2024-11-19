/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';
import { Verify } from './verify';

export const Register = ({ onSubmit, setAlertData }) => {
    const [registerData, setRegisterData] = useState({
        typeUser: "none",
        typeRegister: "native",
        name: null,
        email: "",
        password: "",
    });

    const [verificationCode, setVerificationCode] = useState(null);
    const [open, setOpen] = useState(false);

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
            const code = Math.floor(100000 + Math.random() * 900000);
            setVerificationCode(code);

            sendVerificationEmail(registerData.email, code);
            setAlertData({ type: true, title: "Verificación enviada", description: "Te hemos enviado un correo de verificación. Revisa tu bandeja de entrada." });
        }
    };

    const handleVerificationSubmit = () => {
        setOpen(false);
        setAlertData({ type: true, title: "Verificado", description: "Tu correo ha sido verificado exitosamente." });
        onSubmit(registerData);
    };

    const sendVerificationEmail = (email, verificationCode) => {
        const notificationData = {
            to: email,
            subject: "Verificación de Correo Electrónico",
            text: `Gracias por registrarte. Tu código de verificación es: ${verificationCode}`,
        };

        fetch("http://localhost:3000/notifications/createNotification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notificationData),
        })
        .then((response) => response.json())
        .then(() => {
            setOpen(true);
        })
        .catch((error) => {
            console.error("Error al enviar el correo", error);
            setAlertData({ type: false, title: "Error", description: "Hubo un problema al enviar el correo de verificación." });
        });
    };

    const registerGoogle = useGoogleLogin({
        onSuccess: (response) => {
            if (registerData.typeUser === "none") {
                setAlertData({ type: false, title: "Usuario faltante", description: "Por favor, seleccione su tipo de usuario antes de registrarse con Google." });
                return;
            }

            if (response.access_token) {
                fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${response.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then(res => res.json())
                .then(userData => {
                    const googleLoginData = {
                        typeRegister: "google",
                        typeUser: registerData.typeUser,
                        name: userData.name,
                        email: userData.email,
                        password: null,
                    };

                    onSubmit(googleLoginData);
                })
                .catch(error => {
                    console.error('Error al obtener los datos del usuario:', error);
                    setAlertData({ type: false, title: "Error", description: "No se pudo obtener los datos del usuario." });
                });
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
                <Verify 
                    open={open} 
                    setOpen={setOpen} 
                    verificationCode={verificationCode} 
                    handleVerificationSubmit={handleVerificationSubmit} 
                />
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
