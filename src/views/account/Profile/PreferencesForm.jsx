/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Categories } from "@/components/elements/Categories";

const SERVER = import.meta.env.VITE_API_URL;

export function PreferencesForm({ userData, setUserData }) {
    const [formData, setFormData] = useState(userData);
    const [isEditing, setIsEditing] = useState(false);

    const handleSelectedCategories = (selectedCategories) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            preferences: selectedCategories
        }));
    };

    const updatePreferences = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await fetch(`${SERVER}/users/updatePreferences`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email,
                    newPreferences: formData.preferences,
                }),
            });

            if (response.ok) {
                setUserData({ ...userData, preferences: formData.preferences });
                setIsEditing(false);

                const updatedUser = { ...user, preferences: formData.preferences };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Error updating preferences:", error);
        }
    };

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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData(userData); // Reset the form to user data when canceled
    };
    
    return (
        <form onSubmit={handleUpdateAccount} className="flex flex-col gap-2 mt-2 p-4 border rounded-md">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Preferencias del usuario</h2>
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="correo">Preferencias</Label>
                    <div className="w-full sm:w-3/4 flex">
                        <Categories 
                            setSelectedCategories={handleSelectedCategories} 
                            initialSelectedCategories={formData.preferences || []} // Categorías iniciales
                            fetchGeneralCategories={isEditing} // Hacer fetch si estamos en modo edición
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 justify-end">
                {isEditing ? (
                    <>
                        <Button type="button" className="w-full md:w-32 bg-gray-300 text-black" onClick={handleCancelClick}>Cancelar</Button>
                        <Button type="submit" className="w-full md:w-32 bg-green-500 text-white">Aceptar</Button>
                    </>
                ) : (
                    <Button type="button" className="w-full md:w-32 bg-gray-500 text-white" onClick={handleEditClick}>Editar</Button>
                )}
            </div>
        </form>
    );
}
