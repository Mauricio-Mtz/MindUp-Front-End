/* eslint-disable react/prop-types */
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export default function ListQuestions({ moduleIndex, data, questionIndex, setQuestion, setQuestionIndex, module, fetchCourse }) {

  const deleteQuestion = async () => {
    try {
      const response = await fetch(`${SERVER}/content/delete-question/${questionIndex}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleId: module.id
        }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        fetchCourse();
        setQuestionIndex(null)
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error del servidor");
    }
  };

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
          <div className="flex flex-row gap-2">
            <Button
              className="w-full mt-4"
              disabled={!module}
              onClick={() => {
                setQuestion(null);
                setQuestionIndex(null);
              }}
            >
              Añadir Pregunta
            </Button>
            {questionIndex != null && (
              <Button
                onClick={deleteQuestion}
                className="w-full mt-4 bg-red-600 hover:bg-red-700"
              >
                Eliminar Pregunta
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
