/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export default function CardQuestion({ question, questionIndex, course, module, handleQuestionChange, setQuestion, fetchCourse }) {

  const sendQuestion = async () => {
    // Create a copy of existing questions or start with an empty array
    const tempData = module?.quiz?.questions ? [...module.quiz.questions] : [];
  
    const finalQuestion = {
      options: question.options.filter((opt) => opt !== '').map((opt) => opt),
      question: question.question || "",
      correctAnswer: question.correctAnswer >= 0 ? question.correctAnswer : -1,
    };
  
    if(finalQuestion.question == "" || finalQuestion.correctAnswer === -1 || finalQuestion.options.length == 0){
      toast.error("Llene correctamente los campos de la pregunta");
      return;
    }
  
    // If a specific question index is selected, replace that question
    // Otherwise, push a new question
    if (questionIndex !== null) {      
      tempData[questionIndex] = finalQuestion;
    } else {
      tempData.push(finalQuestion);
    }
      
    const quizData = {
      questions: tempData,
      passing_score: module?.quiz?.passing_score || 0.85
    }
  
    const sendData = {
      quiz: JSON.stringify(quizData),
      id: module.id || -1,
      courseId: course.id
    }
    
    try {
      const response = await fetch(
       `${SERVER}/content/addNewQuestion`,{
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(sendData),
       }
      )
      const result = await response.json();
  
      if (result.success) {        
        toast.success("Pregunta agregada correctamente");
        setQuestion(null)
        fetchCourse();
      } else {
        toast.error("Error en la respuesta del servidor.");
      }
    } catch (err) {
      console.error("Error: ", err)
      toast.error("Error del servidor");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuestionario para el módulo</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <form className="flex flex-col space-y-3">
          <Input
            className="w-full"
            placeholder="¿Qué es ...?"
            value={question?.question || ""}
            disabled={!module}
            onChange={(e) => handleQuestionChange("question", e.target.value)}
          />
          <div className="flex flex-col w-full space-y-2">
            <label className="text-sm font-medium">Opciones</label>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="w-full flex items-center">
                <Input
                  className="w-full"
                  placeholder={`Opción ${index + 1}`}
                  value={question?.options?.[index] || ""}
                  disabled={!module}
                  onChange={(e) =>
                    setQuestion((prev) => {
                      // Ensure options is an array, defaulting to 4 empty strings if not
                      const newOptions = Array.isArray(prev.options) 
                        ? [...prev.options] 
                        : ["", "", "", ""];
                      
                      // Ensure the array has at least 4 elements
                      while (newOptions.length < 4) newOptions.push("");
                      
                      newOptions[index] = e.target.value;
                      return { ...prev, options: newOptions };
                    })
                  }
                />
                <Checkbox
                  className="ml-2 h-full p-0 aspect-square"
                  checked={question?.correctAnswer === index}
                  onCheckedChange={(checked) =>
                    setQuestion((prev) => ({
                      ...prev,
                      correctAnswer: checked ? index : -1,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button className="w-full" onClick={sendQuestion} disabled={!module}>
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
