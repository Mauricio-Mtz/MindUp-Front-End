/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SERVER = import.meta.env.VITE_API_URL;

export const Categories = ({ setSelectedCategories, initialSelectedCategories = [], fetchGeneralCategories = false }) => {
    const [categories, setCategories] = useState([]); // Para las categorías generales
    const [selectedCategories, setSelectedCategoriesState] = useState(initialSelectedCategories); // Inicializa con las preferencias seleccionadas

    useEffect(() => {
        // Si se pasan categorías iniciales, las usamos directamente
        if (!fetchGeneralCategories) {
            setCategories(initialSelectedCategories);
            setSelectedCategoriesState(initialSelectedCategories); // Asegura que las categorías seleccionadas se actualicen
        }
    }, [initialSelectedCategories, fetchGeneralCategories]);

    useEffect(() => {
        // Carga categorías generales si fetchGeneralCategories es true
        if (fetchGeneralCategories) {
            const fetchCategories = async () => {
                try {
                    const response = await fetch(`${SERVER}/content/getCategories`, { method: 'GET' });
                    const categoriesData = await response.json();

                    if (categoriesData.data && categoriesData.data.length > 0) {
                        setCategories(categoriesData.data);
                    } else {
                        setCategories([]); 
                        console.log("No hay categorías.");
                    }
                } catch (error) {
                    console.error("Error al obtener las categorías:", error);
                    setCategories([]); 
                }
            };
            fetchCategories();
        }
    }, [fetchGeneralCategories]);

    const handleToggle = (category) => {
        setSelectedCategoriesState((prevSelected) => {
            const isSelected = prevSelected.includes(category);
            const updatedSelected = isSelected
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category];
            
            setSelectedCategories(updatedSelected); // Notificar al componente padre
            return updatedSelected;
        });
    };

    return (
        <ToggleGroup className="flex flex-wrap gap-1" size="sm" type="multiple" variant="outline">
            {categories.length === 0 && initialSelectedCategories.length === 0 ? (
                <p>No hay categorías disponibles.</p>
            ) : (
                categories.map((category) => (
                    <ToggleGroupItem
                        key={category}
                        value={category}
                        selected={selectedCategories.includes(category)}
                        onClick={() => handleToggle(category)}
                        aria-label={`Toggle ${category}`}
                        disabled={!fetchGeneralCategories} // Deshabilitar si no estamos en modo de edición
                    >
                        <p className='h-4 w-full text-xs'>{category}</p>
                    </ToggleGroupItem>
                ))
            )}
        </ToggleGroup>
    );
};
