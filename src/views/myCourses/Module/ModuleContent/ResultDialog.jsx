/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ResultDialog({ open, onOpenChange, correctAnswersCount, totalQuestions, finalTime, formatTime }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Resultado del Cuestionario</DialogTitle>
                    <DialogDescription>
                        Aquí está el resumen de tu desempeño:
                    </DialogDescription>
                </DialogHeader>
                <div className="text-center">
                    <p className="text-xl font-bold">Respuestas Correctas: {correctAnswersCount} de {totalQuestions}</p>
                    <p className="text-lg mt-2">Tiempo total: {formatTime(finalTime)}</p>
                    {correctAnswersCount === totalQuestions && (
                        <p className="text-green-600 mt-2">¡Perfecto! 🎉</p>
                    )}
                    {correctAnswersCount > 0 && correctAnswersCount < totalQuestions && (
                        <p className="text-yellow-600 mt-2">¡Buen intento! Sigue practicando. 💪</p>
                    )}
                    {correctAnswersCount === 0 && (
                        <p className="text-red-600 mt-2">No te desanimes. Revisa el material y vuelve a intentarlo. 📚</p>
                    )}
                </div>
                <DialogFooter className="flex justify-center gap-2 sm:justify-center">
                    <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cerrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}