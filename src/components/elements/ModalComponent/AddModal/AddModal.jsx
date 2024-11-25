import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Categories } from "../../Categories";

/* eslint-disable react/prop-types */
export function AddModal({ isOpen, closeModal, handleAdd }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const initialState = {
    name: "",
    description: "",
    img: null,
    organization_id: user.organization_id,
    category: [],
  };
  const [courseData, setCourseData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setCourseData(initialState);
      setError(null);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    setCourseData((prev) => ({ ...prev, img: file }));
  };

  const handleCategoryChange = (newCategories) => {
    setCourseData((prev) => ({
      ...prev,
      category: newCategories
    }));
  };

  const handleAddClick = () => {
    const { name, description, img, organization_id, category } = courseData;
    if (!name || !description || !img || !organization_id || category.length === 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Usar FormData para enviar la imagen y los datos
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("img", img);
    formData.append("organization_id", organization_id);
    category.forEach((cat) => formData.append("category[]", cat));

    handleAdd(formData);
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir cursos</DialogTitle>
          <DialogDescription>
            Por favor, complete los siguientes campos para añadir un curso.
          </DialogDescription>
          {error && <p className="text-red-500 col-span-4">{error}</p>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={courseData.name}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nombre del curso"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Descripción del curso"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="img" className="text-right">
              Imagen
            </Label>
            <Input
              id="img"
              name="img"
              type="file"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="category" className="text-right">
              Categorías
            </Label>
            <div className="col-span-3 space-y-2 border rounded-md p-2">
              <Categories 
                mode="edit"
                setSelectedCategories={handleCategoryChange} 
                initialSelectedCategories={[]}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleAddClick}>
            Añadir Curso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
