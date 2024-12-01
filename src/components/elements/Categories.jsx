/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SERVER = import.meta.env.VITE_API_URL;

export const Categories = ({ 
    setSelectedCategories, 
    initialSelectedCategories = [], 
    mode = 'view' 
}) => {
    const [categories, setCategories] = useState([]); 
    const [selectedCategories, setSelectedCategoriesState] = useState(initialSelectedCategories);

    useEffect(() => {
        if (mode === 'edit') {
            const fetchCategories = async () => {
                try {
                    const response = await fetch(`${SERVER}/content/getCategories`, { method: 'GET' });
                    const categoriesData = await response.json();

                    if (categoriesData.data && categoriesData.data.length > 0) {
                        setCategories(categoriesData.data);
                    } else {
                        setCategories([]);
                    }
                } catch (error) {
                    console.error("Error al obtener las categorías:", error);
                    setCategories([]);
                }
            };
            fetchCategories();
        }
    }, [mode]);

    useEffect(() => {
        setSelectedCategories(selectedCategories);
    }, [selectedCategories, setSelectedCategories]);

    const handleToggle = useCallback((category) => {
        if (mode !== 'view') {
            setSelectedCategoriesState((prevSelected) => {
                const isSelected = prevSelected.includes(category);
                return isSelected
                    ? prevSelected.filter((item) => item !== category)
                    : [...prevSelected, category];
            });
        }
    }, [mode]);

    const processedCategories = useMemo(() => {
        if (mode === 'edit') {
            return [...new Set([...initialSelectedCategories, ...categories])];
        }
        return mode === 'view' ? initialSelectedCategories : categories;
    }, [mode, categories, initialSelectedCategories]);

    return (
        <ToggleGroup 
            className="flex flex-wrap gap-1" 
            variant="outline"
            size="sm" 
            type="multiple" 
            value={selectedCategories}
            onValueChange={mode !== 'view' ? setSelectedCategoriesState : undefined}
        >
            {processedCategories.length === 0 ? (
                <p>No hay categorías disponibles.</p>
            ) : (
                processedCategories.map((category) => (
                    <ToggleGroupItem
                        key={category}
                        value={category}
                        onClick={() => handleToggle(category)}
                        aria-label={`Toggle ${category}`}
                        disabled={mode === 'view'}
                    >
                        <p className='h-4 w-full text-xs'>{category}</p>
                    </ToggleGroupItem>
                ))
            )}
        </ToggleGroup>
    );
};