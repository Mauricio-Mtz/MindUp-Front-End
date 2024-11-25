/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Timer, PlayCircle } from "lucide-react";
import { ResultDialog } from './ResultDialog';

const SERVER = import.meta.env.VITE_API_URL;

export function ModuleQuiz({ questions, studentCourseId, moduleId }) {
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(null));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [time, setTime] = useState(0);
    const [finalTime, setFinalTime] = useState(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    console.log(questions)

    useEffect(() => {
        let intervalId;
        if (isQuizStarted && !isQuizFinished && !isSubmitting) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isQuizStarted, isQuizFinished, isSubmitting]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(updatedAnswers);
    };

    const handleStartQuiz = () => {
        setIsQuizStarted(true);
        setIsQuizFinished(false);
        setTime(0);
        setSelectedAnswers(new Array(questions.length).fill(null));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setIsQuizFinished(true);
        setFinalTime(time);

        const correctAnswers = selectedAnswers.filter((answer, index) => 
            answer !== null && answer === questions[index].correctAnswer
        );
        const correctCount = correctAnswers.length;
        const totalQuestions = questions.length;

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
                    completionTime: time,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setCorrectAnswersCount(correctCount);
                setResultDialogOpen(true);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor. ', error)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Card className="flex flex-col justify-between mx-auto mt-5 w-full relative">
                {(!isQuizStarted || isQuizFinished) && (
                    <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10 rounded-lg flex flex-col items-center justify-center gap-4">
                        <div className="text-center px-4">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                ¿Listo para comenzar el cuestionario?
                            </h3>
                            <p className="text-white/90 mb-4">
                                Una vez iniciado, el tiempo comenzará a correr.
                            </p>
                            <Button 
                                onClick={handleStartQuiz}
                                className="bg-white text-black hover:bg-white/90 gap-2"
                            >
                                <PlayCircle className="h-5 w-5" />
                                Comenzar Cuestionario
                            </Button>
                        </div>
                    </div>
                )}

                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <CardTitle>Preguntas</CardTitle>
                    </div>
                    {isQuizStarted && (
                        <div className="flex items-center gap-2 px-4 py-2">
                            <Timer className="h-5 w-5" />
                            <span className="font-mono">{formatTime(isQuizFinished ? finalTime : time)}</span>
                        </div>
                    )}
                </CardHeader>
                
                <CardContent>
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="flex flex-col mb-6">
                                <strong className="mb-2">{question.question}</strong>
                                <RadioGroup 
                                    onValueChange={(value) => handleAnswerChange(questionIndex, parseInt(value))}
                                    className="flex flex-col gap-3 mt-2"
                                    disabled={!isQuizStarted || isQuizFinished}
                                    value={selectedAnswers[questionIndex]?.toString() || ""}
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
                        className="w-full bg-slate-700"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !isQuizStarted || isQuizFinished}
                    >
                        {isSubmitting ? 'Verificando...' : 'Verificar Respuesta'}
                    </Button>
                </CardFooter>
            </Card>

            <ResultDialog 
                open={resultDialogOpen}
                onOpenChange={setResultDialogOpen}
                correctAnswersCount={correctAnswersCount}
                totalQuestions={questions.length}
                finalTime={finalTime}
                formatTime={formatTime}
            />
        </>
    );
}