/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function CardQuestion({
  question,
  setQuestion,
  module,
  handleQuestionChange,
  
}) {

  const sendQuestion = async () => {
    //acceder a module -> quiz {} -> questions [] -> finlQuestion 
    var tempData = [];

    
    if(module?.quiz?.questions){
      module.quiz.questions.map( (item) => {
        tempData.push(item);
      })
    }

    const finalQuestion = {
      options: question.options.filter((opt, i) => opt !== '').map((opt, i) => opt),
      question: question.question || "",
      correctAnswer: question.correctAnswer >= 0 ? question.correctAnswer : -1,
    };

    if(finalQuestion.question == "" || finalQuestion.correctAnswer === -1 || finalQuestion.options.length == 0){
      toast.error("Llene correctamente los campos de la pregunta");
      return;
    }

    if(questionIndex != null){      
      console.log('no ok')
      module.quiz.questions[questionIndex] = finalQuestion;
    }else{
      console.log('ok')
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
    
    console.log('sendData: ', quizData);
    
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
     //.then(response => response.json())
     //const response = await fetch(`${SERVER}/content/getCourse/${course.id}`);
     const result = await response.json();

      if (result.success) {        
        toast.success("Pregunta agregada correctamente");
        setQuestion({
          question: "", // Título de la pregunta
          options: ["", "", "", ""], // Opciones por defecto
          correctAnswer: -1, // Índice de la respuesta correcta (-1 indica ninguna seleccionada)
        })
        fetchCourse();
      } else {
        toast.error("Error en la respuesta del servidor.");
      }
    }catch (err) {
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
                    setQuestion((prev) => ({
                      ...prev,
                      options: prev.options.map((opt, i) =>
                        i === index ? e.target.value : opt
                      ),
                    }))
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
        <Button className="w-full" onClick={sendQuestion}>
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
