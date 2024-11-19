/* eslint-disable react/prop-types */
import { VideoEmbed } from "./VideoEmbed";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function ModuleContent({ content, questions }) {
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
                    {questions.map((question, index) => (
                        <div key={index} className="flex flex-col mb-6">
                        <strong className="mb-2">{question.question}</strong>
                        <RadioGroup className="flex flex-col gap-3 mt-2">
                            {question.options.map((option, i) => (
                            <div key={i} className="flex items-start">
                                <RadioGroupItem id={`option-${question.id}-${i}`} value={i.toString()} className="mr-1" />
                                <Label htmlFor={`option-${question.id}-${i}`} className="leading-tight">{option}</Label>
                            </div>
                            ))}
                        </RadioGroup>
                        </div>
                    ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button style={{ backgroundColor: "#303a53" }} className="w-full">Verificar Respuesta</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
