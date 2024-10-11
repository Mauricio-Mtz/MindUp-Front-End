/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComboContry from "@/components/elements/comboCountry";

export const RegisterData = ({ onRegisterSubmit, setAlertData }) => {
    // Estados para almacenar los valores de los inputs de register
    const sesion = JSON.parse(localStorage.getItem('user'));
    const [registerData, setRegisterData] = useState({
        typeUser: sesion.type,
        email: sesion.email,
        password: "",
        name: "",
        birthdate: "",
        country: "",
        grade: "none",
        token: "",
        address: "",
        rfc: "",
        fiscalAddress: "",
        fiscalRegime: "",
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
        const { password, name, birthdate, country, grade, token, address, rfc, fiscalAddress, fiscalRegime } = registerData;

        // Validación modular de contraseña
        const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

        if (sesion.password === null && !validatePassword(password)) {
            setAlertData({ type: false, title: "Error", description: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número." });
            return false;
        }

        // Validaciones específicas según el tipo de usuario
        if (registerData.typeUser === "student") {
            if (sesion.fullname === null && !name) {
                setAlertData({ type: false, title: "Error", description: "Por favor, ingrese nombre." });
                return false;
            }
            if (!birthdate) {
                setAlertData({ type: false, title: "Error", description: "Por favor, ingresa tu fecha de nacimiento." });
                return false;
            }
            if (!country) {
                setAlertData({ type: false, title: "Error", description: "Por favor, ingrese el país." });
                return false;
            }
            if (grade === "none") {
                setAlertData({ type: false, title: "Error", description: "Por favor, selecciona tu grado escolar." });
                return false;
            }
        }

        if (registerData.typeUser === "organization") {
            if (sesion.name === null && !name) {
                setAlertData({ type: false, title: "Error", description: "Por favor, ingrese el nombre de su Organización." });
                return false;
            }
            if (!address || !rfc || !fiscalRegime || !fiscalAddress) {
                setAlertData({ type: false, title: "Error", description: "Por favor, completa todos los campos obligatorios para la organización." });
                return false;
            }
        }

        if (registerData.typeUser === "member") {
            if (sesion.fullname === null && !name) {
                setAlertData({ type: false, title: "Error", description: "Por favor, ingrese nombre." });
                return false;
            }
            if (!country) {
                setAlertData({ type: false, title: "Error", description: "Por favor, ingrese el país." });
                return false;
            }
            if (!token) {
                setAlertData({ type: false, title: "Error", description: "Por favor, ingresa tu token de miembro." });
                return false;
            }
        }

        return true;
    };

    // Función para manejar el submit
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (validateRegister()) {
            onRegisterSubmit(registerData);
        }
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Información de cuenta</CardTitle>
                <CardDescription>Completa tu registro.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
                <form onSubmit={handleRegisterSubmit} className="flex flex-col h-full">
                    <div className="space-y-2 overflow-y-auto max-h-[321px] mb-4 border-y-2 rounded-md">
                        {sesion.password === null && (
                        <div className="space-y-1">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" placeholder="********" value={registerData.password} onChange={handleRegisterInputChange} required />
                        </div>
                        )}
                        {registerData.typeUser === "student" && (
                        <>
                            {sesion.fullname === null && (
                            <div className="space-y-1">
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Input id="name" type="text" placeholder="Mauricio Martínez Rodríguez" value={registerData.name} onChange={handleRegisterInputChange} required />
                            </div>
                            )}
                            <div className="space-y-1">
                                <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                                <Input id="birthdate" type="date" value={registerData.birthdate} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label>País</Label>
                                <ComboContry value={registerData.country} onChange={handleCountryChange} />
                            </div>
                            <div className="space-y-1">
                                <Label>Grado de Estudio</Label>
                                <Select value={registerData.grade} onValueChange={(value) => setRegisterData({ ...registerData, grade: value })}>
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
                        {registerData.typeUser === "member" && (
                        <>
                            {sesion.fullname === null && (
                            <div className="space-y-1">
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Input id="name" type="text" placeholder="Mauricio Martínez Rodríguez" value={registerData.name} onChange={handleRegisterInputChange} required />
                            </div>
                            )}
                            <div className="space-y-1">
                                <Label>País</Label>
                                <ComboContry value={registerData.country} onChange={handleCountryChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="token">Token de Organización</Label>
                                <Input id="token" type="text" placeholder="123456ABCD" value={registerData.token} onChange={handleRegisterInputChange} required />
                            </div>
                        </>
                        )}
                        {registerData.typeUser === "organization" && (
                        <>
                        
                            {sesion.name === null && (
                            <div className="space-y-1">
                                <Label htmlFor="name">Nombre de la Organización</Label>
                                <Input id="name" type="text" placeholder="Google SA de CV" value={registerData.name} onChange={handleRegisterInputChange} required />
                            </div>
                            )}
                            <div className="space-y-1">
                                <Label htmlFor="address">Dirección de la Empresa</Label>
                                <Input id="address" type="text" placeholder="Calle 1 # 2-3" value={registerData.address} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="rfc">RFC de la Empresa</Label>
                                <Input id="rfc" type="text" placeholder="AAA010101AAA" value={registerData.rfc} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="fiscalRegime">Registro Fiscal</Label>
                                <Input id="fiscalRegime" type="text" placeholder="Registro Fiscal" value={registerData.fiscalRegime} onChange={handleRegisterInputChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="fiscalAddress">Dirección Fiscal</Label>
                                <Input id="fiscalAddress" type="text" placeholder="Dirección Fiscal" value={registerData.fiscalAddress} onChange={handleRegisterInputChange} required />
                            </div>
                        </>
                        )}
                    </div>
                    <Button type="submit" className="w-full">
                        Crear cuenta
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default RegisterData;