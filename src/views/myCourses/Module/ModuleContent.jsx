/* eslint-disable react/prop-types */
import { useState } from 'react';
import { VideoEmbed } from "./VideoEmbed";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";

const SERVER = import.meta.env.VITE_API_URL;

export function ModuleContent({ content, questions, studentCourseId, moduleId }) {
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(null));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    // Función para manejar la selección de respuestas
    const handleAnswerChange = (questionIndex, answerIndex) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(updatedAnswers);
    };

    // Función para manejar el envío de respuestas
    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Calcular las respuestas correctas con más detalle
        const correctAnswers = selectedAnswers.filter((answer, index) => 
            answer !== null && answer === questions[index].correctAnswer
        );
        const correctCount = correctAnswers.length;

        // Total de preguntas
        const totalQuestions = questions.length;

        // Hacer la solicitud al backend para registrar el progreso del cuestionario
        try {
            const response = await fetch(`${SERVER}/users/registerQuizzResult`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentCourseId,
                    moduleId,
                    correctAnswers: correctCount,
                    totalQuestions,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setCorrectAnswersCount(correctCount);
                setResultDialogOpen(true);
                setResultMessage('¡Progreso registrado con éxito!');
            } else {
                setResultMessage('Hubo un error al registrar el progreso.');
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor. ', error)
            setResultMessage('Error en la conexión con el servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {content.map((item, index) => (
                <div key={index} className="mb-10">
                    <h1 className="text-2xl font-bold">{item?.subTitle ?? null}</h1>
                    <p className="mt-4">{item?.text ?? null}</p>
                    <VideoEmbed videoUrl={item.videoUrl} />
                </div>
            ))}
            <Card className="flex flex-col justify-between mx-auto mt-5 w-full">
                <CardHeader>
                    <CardTitle>Preguntas:</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="flex flex-col mb-6">
                                <strong className="mb-2">{question.question}</strong>
                                <RadioGroup 
                                    onValueChange={(value) => handleAnswerChange(questionIndex, parseInt(value))}
                                    className="flex flex-col gap-3 mt-2"
                                >
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center space-x-2">
                                            <RadioGroupItem 
                                                value={optionIndex.toString()} 
                                                id={`option-${question.id}-${optionIndex}`} 
                                            />
                                            <Label htmlFor={`option-${question.id}-${optionIndex}`}>
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        style={{ backgroundColor: "#303a53" }}
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Verificando...' : 'Verificar Respuesta'}
                    </Button>
                </CardFooter>
            </Card>
            {resultMessage && <div className="mt-4 text-center">{resultMessage}</div>}

            {/* Diálogo de resultados */}
            <Dialog open={resultDialogOpen} onOpenChange={setResultDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Resultado del Cuestionario</DialogTitle>
                        <DialogDescription>
                            Aquí está el resumen de tu desempeño:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center">
                        <p className="text-xl font-bold">
                            Respuestas Correctas: {correctAnswersCount} de {questions.length}
                        </p>
                        {correctAnswersCount === questions.length && (
                            <p className="text-green-600 mt-2">¡Perfecto! 🎉</p>
                        )}
                        {correctAnswersCount > 0 && correctAnswersCount < questions.length && (
                            <p className="text-yellow-600 mt-2">¡Buen intento! Sigue practicando. 💪</p>
                        )}
                        {correctAnswersCount === 0 && (
                            <p className="text-red-600 mt-2">No te desanimes. Revisa el material y vuelve a intentarlo. 📚</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}