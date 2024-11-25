/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Categories } from "@/components/elements/Categories";

const SERVER = import.meta.env.VITE_API_URL;

export function PreferencesForm({ userData, setUserData }) {
    // Mantiene una copia local de los datos del usuario para edición
    const [formData, setFormData] = useState(userData);
    
    // Estado para manejar el modo de edición
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para manejar las categorías seleccionadas
    const [selectedCategories, setSelectedCategories] = useState(userData.preferences || []);

    // Efecto para actualizar selectedCategories cuando cambia userData
    useEffect(() => {
        setSelectedCategories(userData.preferences || []);
        setFormData(userData);
    }, [userData]);

    // Función para manejar las categorías seleccionadas
    const handleSelectedCategories = (newSelectedCategories) => {
        setSelectedCategories(newSelectedCategories);
    };

    // Función para actualizar preferencias
    const updatePreferences = async () => {
        try {
            // Obtener usuario de localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            
            // Realizar la solicitud de actualización
            const response = await fetch(`${SERVER}/users/updatePreferences`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    email: userData.email,
                    newPreferences: selectedCategories,
                }),
            });

            // Parsear respuesta del servidor
            const responseData = await response.json();

            if (response.ok) {
                // Actualizar estado del usuario
                const updatedUserData = {
                    ...userData,
                    preferences: selectedCategories
                };
                setUserData(updatedUserData);

                // Actualizar localStorage
                const updatedUser = { 
                    ...user, 
                    preferences: selectedCategories 
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                // Mostrar toast de éxito
                toast.success("Preferencias actualizadas correctamente");
                
                // Salir del modo de edición
                setIsEditing(false);
            } else {
                // Manejar errores del servidor
                toast.error(responseData.message || "Error al actualizar preferencias");
            }
        } catch (error) {
            console.error("Error updating preferences:", error);
            toast.error("No se pudieron actualizar las preferencias");
        }
    };

    // Manejador de envío del formulario
    const handleUpdateAccount = (e) => {
        e.preventDefault();

        toast("¿Desea guardar los cambios?", {
            description: "Confirme para actualizar su información.",
            action: {
                label: "Aceptar",
                onClick: async () => {
                    await updatePreferences();
                },
            },
            dismissible: true,
            duration: 5000,
        });
    };

    // Manejador para entrar en modo edición
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Manejador para cancelar la edición
    const handleCancelClick = () => {
        setIsEditing(false);
        // Restaurar categorías originales
        setSelectedCategories(userData.preferences || []);
        setFormData(userData);
    };
    
    return (
        <form onSubmit={handleUpdateAccount} className="flex flex-col gap-2 mt-2 p-4 border rounded-md">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Preferencias del usuario</h2>
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="correo">Preferencias</Label>
                    <div className="w-full sm:w-3/4 flex">
                        <Categories 
                            mode={isEditing ? 'edit' : 'view'}
                            initialSelectedCategories={formData.preferences || []}
                            setSelectedCategories={handleSelectedCategories}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 justify-end">
                {isEditing ? (
                    <>
                        <Button 
                            type="button" 
                            className="w-full md:w-32 bg-gray-300 text-black" 
                            onClick={handleCancelClick}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            className="w-full md:w-32 bg-green-500 text-white"
                        >
                            Aceptar
                        </Button>
                    </>
                ) : (
                    <Button 
                        type="button" 
                        className="w-full md:w-32 bg-gray-500 text-white" 
                        onClick={handleEditClick}
                    >
                        Editar
                    </Button>
                )}
            </div>
        </form>
    );
}