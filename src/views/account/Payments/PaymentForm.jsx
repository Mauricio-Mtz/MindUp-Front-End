/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export function PaymentForm({ paymentData, setPaymentData }) {
    const [formData, setFormData] = useState({ ...paymentData, password: "" });
    const [isEditing, setIsEditing] = useState(false);

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
                    email: paymentData.email,
                    newEmail: formData.email.trim(),
                }),
            });

            if (response.ok) {
                setPaymentData({ ...paymentData, email: formData.email });
                setIsEditing(false);
                const updatedUser = { ...user, email: formData.email };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                toast.error("Error al actualizar el correo.");
            }
        } catch (error) {
            console.error("Error updating email:", error);
            toast.error("No se pudo actualizar el correo.");
        }
    };

    const handleUpdatePayment = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        toast("¿Desea guardar los cambios?", {
            description: "Confirme para actualizar su información.",
            action: {
                label: "Aceptar",
                onClick: async () => {
                    if (isEditing) {
                        if (!emailRegex.test(formData.email.trim())) {
                            toast("Correo no aceptado", {
                                description: "Por favor, coloque un correo válido.",
                                dismissible: true,
                                duration: 5000,
                            });
                            return;
                        }
                        await updateEmail();
                    }
                },
            },
            dismissible: true,
            duration: 5000,
        });
    };

    return (
        <form onSubmit={handleUpdatePayment} className="flex flex-col gap-2 mt-2 p-4 border rounded-md">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Metodo de pago</h2>
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
                            disabled={!isEditing}
                            className="w-full" 
                            required 
                        />
                        <Button 
                            type="button" 
                            className="ml-2 bg-gray-500 text-white w-28"
                            onClick={() => {
                                setIsEditing(!isEditing);
                                if (!isEditing) setFormData(paymentData);
                            }}
                        >
                            {isEditing ? 'Cancelar' : 'Editar'}
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
                            value={isEditing ? formData.password : "********"}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full"
                            minLength={8}
                            required={isEditing}
                        />
                        <Button 
                            type="button" 
                            className="ml-2 bg-gray-500 text-white w-28"
                            onClick={() => {
                                setIsEditing(!isEditing);
                                if (!isEditing) setFormData({ ...formData, password: "" });
                            }}
                        >
                            {isEditing ? 'Cancelar' : 'Editar'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Botón de Guardar Cambios */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 justify-end w-full">
                {(isEditing) && (
                    <Button type="submit" className="w-full md:w-32 bg-green-500 text-white">
                        Guardar Cambios
                    </Button>
                )}
            </div>
        </form>
    );
}
