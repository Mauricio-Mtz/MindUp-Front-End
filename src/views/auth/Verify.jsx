/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Verify({ open, setOpen, verificationCode, handleVerificationSubmit }) {
    const [enteredCode, setEnteredCode] = useState("");

    const handleVerify = () => {
        if (enteredCode === "") {
            alert("Por favor ingresa el código de verificación.");
            return;
        }

        if (parseInt(enteredCode, 10) === verificationCode) {
            handleVerificationSubmit();
        } else {
            alert("El código de verificación no es correcto.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Verifica tu correo</DialogTitle>
                    <DialogDescription>
                        Te hemos enviado un correo de verificación. Revisa tu bandeja de entrada.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="codigo" className="text-right">
                            Código de verificación
                        </Label>
                        <Input
                            id="codigo"
                            value={enteredCode}
                            onChange={(e) => setEnteredCode(e.target.value)}  // Actualiza el estado cuando se ingresa el código
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleVerify}>Verificar</Button>  {/* Cambiar el texto del botón y la lógica */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
