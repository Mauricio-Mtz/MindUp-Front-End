/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';

export const Login = ({ onSubmit, setAlertData }) => {
  const [loginData, setLoginData] = useState({
    type: "native",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const validateLogin = () => {
    if (!loginData.email || !loginData.password) {
      setAlertData({ type: false, title: "Faltan campos", description: "Por favor, completa todos los campos de inicio de sesión." });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      setAlertData({ type: false, title: "Correo inválido", description: "Por favor, coloque un correo válido." });
      return false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(loginData.password)) {
      setAlertData({ type: false, title: "Contraseña inválida", description: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número." });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateLogin()) {
      // Enviar el objeto loginData al componente padre
      onSubmit(loginData);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (response) => {
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
            type: "google",
            email: userData.email,
            password: "", // No se usa la contraseña en el login de Google
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
        <CardTitle>Inicia Sesión</CardTitle>
        <CardDescription>¡Bienvenido! Inicia sesión y retoma.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <form className="space-y-2 flex flex-col justify-between h-full" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div>
            <div className="space-y-1">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="abc1@example.com"
                value={loginData.email}
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
                value={loginData.password}
                onChange={handleInputChange}
              />
              <a className='text-sm text-muted-foreground' href="">¿Olvidaste tu contraseña?</a>
            </div>
          </div>
          <Button type="submit" className="w-full mt-auto" id="login">
            Iniciar Sesión
          </Button>
        </form>
        <div className='flex flex-col items-center mt-auto'>
          <Button className="bg-white border hover:bg-slate-300 text-black w-full mt-2 flex items-center justify-between overflow-hidden whitespace-nowrap" onClick={loginGoogle}>
            <img src="/assets/svg/google-logo.svg" alt="" width={"20px"} />
            <span className="flex-1 text-center">Iniciar sesión con Google</span>
          </Button>
          <a className="text-sm text-muted-foreground text-blue-500" href="/politicas">Políticas de privacidad</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
