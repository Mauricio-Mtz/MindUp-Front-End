/* eslint-disable react/prop-types */
// AccountForm.js
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export function AccountForm({ userData, setUserData }) {
    const [formData, setFormData] = useState({ ...userData, password: "" }); // Inicia password como cadena vacía
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateEmail = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await fetch(`${SERVER}/users/updateEmail`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email, // Email actual
                    newEmail: formData.email, // Nuevo email
                }),
            });
    
            if (response.ok) {
                setUserData({ ...userData, email: formData.email });
                setIsEditingEmail(false);
    
                // Solo actualizar el email en el objeto user y guardarlo en localStorage
                const updatedUser = { ...user, email: formData.email };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };
    
    const updatePassword = async () => {
        try {
            const response = await fetch(`${SERVER}/users/updatePassword`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email, // Email actual para identificación
                    newPassword: formData.password, // Nueva contraseña
                }),
            });
            if (response.ok) {
                setFormData({ ...formData, password: "" });
                setIsEditingPassword(false);
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };
    
    const handleUpdateAccount = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        toast("¿Desea guardar los cambios?", {
            description: "Confirme para actualizar su información.",
            action: {
                label: "Aceptar",
                onClick: async () => {
                    if (isEditingEmail) {
                        if (!emailRegex.test(formData.email)) {
                            toast("Correo no aceptado", {
                                description: "Por favor, coloque un correo válido.",
                                dismissible: true,
                                duration: 5000,
                            });
                            return false;
                        }
                        await updateEmail();
                    } else if (isEditingPassword) {
                        if (!passwordRegex.test(formData.password)) {
                            toast("Contraseña no aceptada.", {
                                description: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número.",
                                dismissible: true,
                                duration: 5000,
                            });
                            return false;
                        }
                        await updatePassword();
                    }
                },
            },
            dismissible: true,
            duration: 5000,
        });
    };    

    return (
        <form onSubmit={handleUpdateAccount} className="flex flex-col gap-2 mt-2 p-2 border rounded-md">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Cuenta</h2>
            <div className="space-y-2">
                {/* Sección de edición de correo */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="correo">Correo</Label>
                    <div className="w-full sm:w-3/4 flex">
                        <Input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleInputChange}
                            disabled={!isEditingEmail}
                            className="w-full" 
                            required 
                        />
                        <Button 
                            type="button" 
                            className="ml-2 bg-gray-500 text-white w-28"
                            onClick={() => {
                                setIsEditingEmail(!isEditingEmail);
                                setIsEditingPassword(false); // Deshabilita la edición de contraseña
                                if (!isEditingEmail) setFormData(userData); // Restablecer email al cancelar edición
                            }}
                        >
                            {isEditingEmail ? 'Cancelar' : 'Editar'}
                        </Button>
                    </div>
                </div>

                {/* Sección de edición de contraseña */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="contraseña">Contraseña</Label>
                    <div className="w-full sm:w-3/4 flex">
                        <Input 
                            type="password" 
                            name="password"
                            placeholder="Nueva contraseña"
                            value={isEditingPassword ? formData.password : "********"} // Mostrar "********" cuando no se edita
                            onChange={handleInputChange}
                            disabled={!isEditingPassword}
                            className="w-full"
                            minLength={8}
                            required={isEditingPassword} // Solo es requerido si se está editando
                        />
                        <Button 
                            type="button" 
                            className="ml-2 bg-gray-500 text-white w-28"
                            onClick={() => {
                                setIsEditingPassword(!isEditingPassword);
                                setIsEditingEmail(false); // Deshabilita la edición de correo
                                if (!isEditingPassword) setFormData({ ...formData, password: "" }); // Restablecer password al cancelar edición
                            }}
                        >
                            {isEditingPassword ? 'Cancelar' : 'Editar'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Botón de Guardar Cambios */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 justify-end w-full">
                {(isEditingEmail || isEditingPassword) && (
                    <Button type="submit" className="w-full md:w-32 bg-green-500 text-white">
                        Guardar Cambios
                    </Button>
                )}
            </div>
        </form>
    );
}
