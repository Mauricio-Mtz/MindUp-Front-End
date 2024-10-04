/* eslint-disable react/prop-types */
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComboContry from "@/components/elementos/comboCountry";

export const Register = ({ onRegisterSubmit, setAlertData }) => {  
    // Estado para manejar la selección del tipo de usuario
    const [userType, setUserType] = useState("student");
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

    // Función para manejar los cambios en los inputs de register
    const handleRegisterInputChange = (e) => {
        const { id, value } = e.target;
        setRegisterData({ ...registerData, [id]: value });
    };

    // Manejar cambios en ComboCountry
    const handleCountryChange = (value) => {
        setRegisterData({ ...registerData, country: value });
    };

    // Validación general del formulario
    const validateRegister = () => {
        const { email, password, name, country, age, grade, organizationName, address, rfc, regFiscal, fiscalAddress, memberId } = registerData;
        // Función modular para validaciones
        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
        const validateAge = (age) => Number.isInteger(Number(age)) && age > 0 && age < 100;

        // Validación común para todos los tipos de usuario
        if (!email || !password || !name || !country) {
            setAlertData({ type: "error", message: "Por favor, completa todos los campos obligatorios." });
            return false;
        }

        if (!validateEmail(email)) {
            setAlertData({ type: "error", message: "Por favor, ingresa un correo electrónico válido." });
            return false;
        }
        
        if (!validatePassword(password)) {
            setAlertData({ type: "error", message: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número." });
            return false;
        }

        // Validaciones específicas según el tipo de usuario
        if (userType === "student") {
                if (!age || !validateAge(age)) {
                    setAlertData({ type: "error", message: "Por favor, ingresa una edad válida entre 1 y 100." });
                    return false;
                }
                if (grade === "none") {
                    setAlertData({ type: "error", message: "Por favor, selecciona tu grado escolar." });
                    return false;
                }
        }

        if (userType === "organization") {
            if (!organizationName || !address || !rfc || !regFiscal || !fiscalAddress) {
                setAlertData({ type: "error", message: "Por favor, completa todos los campos obligatorios para la organización." });
                return false;
            }
        }

        if (userType === "member" && !memberId) {
            setAlertData({ type: "error", message: "Por favor, ingresa tu ID de miembro." });
            return false;
        }

        return true;
    };

    // Función para manejar el submit
    const handleRegisterSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        if (validateRegister()) {
            onRegisterSubmit(registerData); // Enviar los datos de registro al componente padre
        }
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Regístrate</CardTitle>
                <CardDescription>Regístrate para acceder a los cursos .</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
                <form onSubmit={handleRegisterSubmit}>
                    <div className='space-y-2 overflow-y-auto max-h-[252px] mb-4 border-y-2 rounded-md'>
                        <div className="space-y-1">
                            <Label >Soy...</Label>
                            <Select defaultValue="student" onValueChange={setUserType}>
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
                        <div className="space-y-1">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" placeholder="ejemplo@dominio.com" value={registerData.email} onChange={handleRegisterInputChange} required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" placeholder="********" value={registerData.password} onChange={handleRegisterInputChange} required />
                        </div>

                        {(userType === "student" || userType === "member") && (
                        <>
                            <div className="space-y-1">
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Input id="name" type="text" placeholder="Mauricio Martínez Rodríguez" value={registerData.name} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label>País</Label>
                                <ComboContry value={registerData.country} onChange={handleCountryChange} />
                            </div>
                        </>
                        )}

                        {userType === "student" && (
                        <>
                            <div className="space-y-1">
                                <Label htmlFor="age">Edad</Label>
                                <Input id="age" type="number" max="100" min="0" inputMode="numeric" pattern="\d*" value={registerData.age} onChange={handleRegisterInputChange} required />
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
                                <Input id="organizationName" type="text" placeholder="Google SA de CV" value={registerData.organizationName} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="address">Dirección de la Empresa</Label>
                                <Input id="address" type="text" placeholder="Calle 1 # 2-3" value={registerData.address} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="rfc">RFC de la Empresa</Label>
                                <Input id="rfc" type="text" placeholder="AAA010101AAA" maxLength="14" value={registerData.rfc} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="regFiscal">Régimen Fiscal</Label>
                                <Input id="regFiscal" type="text" placeholder="601 ABCD" value={registerData.regFiscal} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="fiscalAddress">Dirección Fiscal</Label>
                                <Input id="fiscalAddress" type="text" placeholder="Calle 1 # 2-3" value={registerData.fiscalAddress} onChange={handleRegisterInputChange} required />
                            </div>
                        </>
                        )}

                        {userType === "member" && (
                        <>
                            <div className="space-y-1">
                                <Label htmlFor="memberId">ID de Organización</Label>
                                <Input id="memberId" type="text" placeholder="123456ABCD" value={registerData.memberId} onChange={handleRegisterInputChange} required />
                            </div>
                        </>
                        )}
                    </div>

                    <Button type="submit" className="w-full">Registrarse</Button>
                </form>
                <div className='flex flex-col items-center mt-auto'>
                    <p className="text-sm text-muted-foreground">¿Ya tienes una cuenta? <a href="/login" className="text-blue-500">Inicia sesión</a></p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Register;