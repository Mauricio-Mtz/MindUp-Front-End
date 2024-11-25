/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'; // Añade useEffect
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Categories } from "@/components/elements/Categories";

const SERVER = import.meta.env.VITE_API_URL;

export function PreferencesForm({ userData, setUserData }) {
    const [formData, setFormData] = useState(userData);
    const [isEditing, setIsEditing] = useState(false);
    
    // Nuevo estado para manejar las categorías seleccionadas
    const [selectedCategories, setSelectedCategories] = useState(userData.preferences || []);

    // console.log("FORMDATA", formData.preferences);
    // console.log("Selected Categories", selectedCategories);

    // Efecto para actualizar selectedCategories cuando cambia userData
    useEffect(() => {
        setSelectedCategories(userData.preferences || []);
    }, [userData]);

    const handleSelectedCategories = (newSelectedCategories) => {
        setSelectedCategories(newSelectedCategories);
        
        // Actualiza formData con las nuevas categorías seleccionadas
        setFormData((prevFormData) => ({
            ...prevFormData,
            preferences: newSelectedCategories
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
                    newPreferences: selectedCategories,
                }),
            });

            if (response.ok) {
                setUserData({ ...userData, preferences: selectedCategories });
                setIsEditing(false);

                const updatedUser = { ...user, preferences: selectedCategories };
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
        // Restaura las categorías originales
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
                            setSelectedCategories={handleSelectedCategories} 
                            initialSelectedCategories={userData.preferences || []} 
                            fetchGeneralCategories={isEditing}
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