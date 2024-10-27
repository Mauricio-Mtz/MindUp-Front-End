/* eslint-disable react/prop-types */
// UserInfoForm.js
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import ComboContry from "@/components/elements/comboCountry";

const SERVER = import.meta.env.VITE_API_URL;

export function InformationForm({ userData, setUserData }) {
    const [formData, setFormData] = useState(userData);
    const [isEditing, setIsEditing] = useState(false);

    const confirmUpdate = async () => {
        toast("¿Desea guardar los cambios?", {
            description: "Confirme para actualizar su información.",
            action: {
                label: "Aceptar",
                onClick: () => updateInformation(),
            },
            dismissible: true,
            duration: 5000,
        });
    };

    const updateInformation = async () => {
        try {
            const response = await fetch(`${SERVER}/users/updateInformation`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setUserData(formData);
                toast("Información actualizada correctamente!");
            } else {
                toast("Error al actualizar la información. Inténtelo de nuevo.");
            }
        } catch (error) {
            console.error("Error updating information:", error);
            toast("Error en la conexión. Inténtelo más tarde.");
        }
    };
    
    return (
        <form onSubmit={(e) => { e.preventDefault(); confirmUpdate(); }} className="flex flex-col gap-2 mt-2 p-2 border rounded-md">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Información de usuario</h2>
            <div className="space-y-2">
                <div className="flex text-left flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="w-full sm:w-3/4">
                        <Input 
                            type="text" 
                            name="fullname"
                            value={formData.fullname} 
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setFormData({ ...formData, [name]: value });
                            }}
                            disabled={!isEditing}
                            className="w-full" 
                            required 
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="fecha-nacimiento">Fecha de nacimiento</Label>
                    <div className="w-full sm:w-3/4">
                        <Input 
                            type="date" 
                            name="birthdate"
                            value={formData.birthdate ? new Date(formData.birthdate).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setFormData({ ...formData, [name]: value });
                            }}
                            disabled={!isEditing}
                            className="w-full" 
                            required 
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="grado-estudios">Grado de estudios</Label>
                    <div className="w-full sm:w-3/4">
                        <Select
                            name={"grade"}
                            value={formData.grade} 
                            onValueChange={(value) => setFormData({ ...formData, grade: value })}
                            disabled={!isEditing}
                            className="w-full" 
                            required 
                        >
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
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="pais">País</Label>
                    <div className="w-full sm:w-3/4">
                        <ComboContry 
                            name="country"
                            value={formData.country}
                            onChange={(value) => setFormData({ ...formData, country: value })}
                            disabled={!isEditing}
                            className="w-full"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 justify-end">
                {isEditing ? (
                    <>
                        <Button type="button" className="w-full md:w-32 bg-gray-300 text-black" onClick={() => {
                            setIsEditing(false);
                            setFormData(userData);
                        }}>Cancelar</Button>
                        <Button type="submit" className="w-full md:w-32 bg-green-500 text-white">Aceptar</Button>
                    </>
                ) : (
                    <Button type="button" className="w-full md:w-32 bg-gray-500 text-white" onClick={() => { setIsEditing(!isEditing); }}>Editar</Button>
                )}
            </div>
        </form>
    );
}
