import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ListQuestions({
  moduleIndex,
  data,
  questionIndex,
  setQuestion,
  setQuestionIndex,
}) {
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle>Preguntas por módulo</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-2 flex flex-col">
        <div className="max-h-[220px] overflow-y-auto show-scrollbar">
          {moduleIndex !== null ? (
            data?.modules?.[moduleIndex]?.quiz?.questions?.map(
              (question, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 hover:bg-gray-500 w-full text-left p-1 rounded`}
                  onClick={() => {
                    setQuestion(question);
                    setQuestionIndex(index);
                  }}
                >
                  <div
                    className={`w-4 h-4 ${
                      questionIndex === index ? "bg-primary" : "bg-gray-500"
                    } rounded-full`}
                  ></div>
                  <span>{question.question}</span>
                </button>
              )
            )
          ) : (
            <div className="text-center">Seleccione un módulo</div>
          )}
          <Button
            className="w-full mt-4"
            onClick={() => {
              setQuestion({
                question: "", // Título de la pregunta
                options: ["", "", "", ""], // Opciones por defecto
                correctAnswer: -1, // Índice de la respuesta correcta (-1 indica ninguna seleccionada)
              });
              setQuestionIndex(null);
            }}
          >
            Añadir Pregunta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
