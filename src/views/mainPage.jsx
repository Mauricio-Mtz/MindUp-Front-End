import Navbar from '../components//elementos/navbar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Carrusel from '../components//elementos/carrousel';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');  // Cambia '/nueva-ruta' por la ruta que necesites
  };
  return (
    <div className="scrollbar-hide">
      <Navbar />
      
      <div className="w-full flex justify-center " style={{ backgroundColor: "#004c83" }}>
        <img src="/image/banner-principal.png" alt="imgP" style={{ width: "90%" }}/>
      </div>
      <div className='py-3 px-10 flex justify-center'>
        <Button onClick={goToLogin} className="px-10 rounded-full">Entra y registrate aquí.</Button>
      </div>
      
      <div className="py-10 px-10 flex flex-col gap-4 md:flex-row justify-center">
        {/* Tarjeta ocupando el 50% en pantallas medianas y grandes */}
        <Card className="w-full md:w-[50%] shadow-md" style={{ borderRadius: "20px" }}>
          <CardHeader>
            <CardTitle><b>¿Qué es MindUp?</b></CardTitle>
          </CardHeader>
          <CardContent>
            <p>MindUp es una plataforma de cursos en línea con tecnología de autoaprendizaje, diseñada para ayudarte a aprender de forma efectiva y personalizada. Nuestra plataforma utiliza algoritmos de machine learning para analizar tus habilidades y debilidades, y adaptar el contenido a tus necesidades individuales. De esta forma, puedes aprender a tu propio ritmo y enfocarte en las áreas que más necesitas mejorar.</p>
            <br />
            <p>En MindUp, creemos que el aprendizaje debe ser divertido y accesible para todos. Por eso, hemos diseñado nuestra plataforma para que sea fácil de usar, incluso para aquellos que no tienen experiencia previa en línea. Nuestros cursos están diseñados para ser interactivos y atractivos, con ejercicios prácticos y retroalimentación personalizada para ayudarte a mejorar tus habilidades.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* Puedes añadir botones aquí */}
          </CardFooter>
        </Card>

        {/* Carrusel ocupando el 50% en pantallas medianas y grandes */}
        <div className="w-full md:w-[50%]">
          <Carrusel />
        </div>
      </div>
      <div className='py-2 px-10 flex justify-center'>
        <p><b>Somos tu mejor opción, contamos con la mayor variedad de curso. Cada experiencia es única porque contamos con nuetra tecnologia adaptativa.</b></p>
        
      </div>

    </div>
  );
}

export default MainPage;
