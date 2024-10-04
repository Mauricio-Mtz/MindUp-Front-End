/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';

export const Login = ({ onLoginSubmit, setAlertData }) => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleLoginInputChange = (e) => {
        const { id, value } = e.target;
        setLoginData({ ...loginData, [id]: value });
    };

    const validateLogin = () => {
        if (!loginData.email || !loginData.password) {
            setAlertData({ type: "error", message: "Por favor, completa todos los campos de login." });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginData.email)) {
            setAlertData({ type: "error", message: "Por favor, coloque un correo valido." });
            return false;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(loginData.password)) {
            setAlertData({ type: "error", message: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número." });
            return false;
        }

        return true;
    };

    const handleLoginSubmit = () => {
        if (validateLogin()) {
            onLoginSubmit(loginData);
        }
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: (response) => {
            console.log('Inicio de sesión exitoso:', response);
            onLoginSubmit(response)
        },
        onError: (error) => {
            console.log('Error al iniciar sesión:', error);
        },
    });
    

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Inicia Sesión</CardTitle>
                <CardDescription>¡Bienvenido! Inicia sesión y retoma.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
                <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); handleLoginSubmit(); }}>
                    <div className="space-y-1">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="abc1@example.com"
                            value={loginData.email}
                            onChange={handleLoginInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="*******"
                            minLength={8}
                            value={loginData.password}
                            onChange={handleLoginInputChange}
                            required
                        />
                    </div>
                    <div className='text-center'>
                        <Button type="submit" className="w-full" id="login">
                            Inicia Sesión
                        </Button>
                        <a className='text-sm text-muted-foreground' href="">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
                <div className='flex flex-col items-center mt-auto'>
                    <Button 
                        className="bg-white hover:bg-slate-300 text-black w-full mt-2 flex items-center justify-between overflow-hidden whitespace-nowrap"
                        onClick={loginGoogle}
                    >
                        <img src="/assets/svg/google-logo.svg" alt="" width={"20px"} />
                        <span className="flex-1 text-center">Inicia sesión con Google</span>
                    </Button>
                    <a className="text-sm text-muted-foreground text-blue-500" href="/politicas">Políticas de privacidad</a>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;
