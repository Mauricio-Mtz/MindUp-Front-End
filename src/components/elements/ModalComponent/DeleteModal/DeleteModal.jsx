import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* eslint-disable react/prop-types */
export function DeleteModal({ type, isOpen, closeModal, handleDelete }) {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(null);

  const handleDeleteClick = () => {
    if (inputText.toLowerCase() === "eliminar") {
      handleDelete();
      closeModal();
    } else {
      setError("Debe escribir 'eliminar' para confirmar.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar {type}</DialogTitle>
          <DialogDescription>
            Por favor, escriba -eliminar- para confirmar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-delete" className="text-right">
              Confirmar
            </Label>
            <Input
              id="confirm-delete"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="col-span-3"
            />
          </div>
          {error && <p className="text-red-500 col-span-4">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleDeleteClick}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
