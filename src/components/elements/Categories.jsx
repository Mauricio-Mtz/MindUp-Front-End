/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SERVER = import.meta.env.VITE_API_URL;

export const Categories = ({ setSelectedCategories, initialSelectedCategories = [], fetchGeneralCategories = false }) => {
    const [categories, setCategories] = useState([]); 
    const [selectedCategories, setSelectedCategoriesState] = useState(initialSelectedCategories);

    useEffect(() => {
        // Actualizar selectedCategories cuando initialSelectedCategories cambie
        setSelectedCategoriesState(initialSelectedCategories);
    }, [initialSelectedCategories]);

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
        } else {
            // Si no se está en modo de edición, usar las categorías iniciales
            setCategories(initialSelectedCategories);
        }
    }, [fetchGeneralCategories, initialSelectedCategories]);

    const handleToggle = (category) => {
        setSelectedCategoriesState((prevSelected) => {
            const isSelected = prevSelected.includes(category);
            const updatedSelected = isSelected
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category];
            
            setSelectedCategories(updatedSelected);
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
                        disabled={!fetchGeneralCategories}
                    >
                        <p className='h-4 w-full text-xs'>{category}</p>
                    </ToggleGroupItem>
                ))
            )}
        </ToggleGroup>
    );
};