import React from 'react';
import Navbar from '@/components/elements/navbar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import './LandingAdmin.css';

function LandingAdmin() {
    const navigate = useNavigate();
    const handleNavigate = (route) => {
      navigate(route);
    };
  
    return (
      <div className="scrollbar-hide">
        <Navbar />
        
        <div className="dashboard-container">
          <img src="/assets/images/banneradm.png" alt="Admin" className="dashboard-banner"/>
        </div>
        
        <div className="dashboard-header">
            <h2 className="text-gray-800 dark:text-white">Control Total para Crecer y Fortalecer el Conocimiento</h2>
            <p className="text-gray-600 dark:text-gray-300">Administra todos los aspectos de la plataforma MindUp desde aquí.</p>
        </div>

  
        <div className="dashboard-cards">
          <Card className="card">
            <CardHeader>
              <CardTitle><b>Cursos</b></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Visualiza, crea, edita y elimina cursos. Organiza y categoriza el contenido para brindar una experiencia de aprendizaje efectiva.</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleNavigate('/admin/courses')} className="rounded-full">Gestionar Cursos</Button>
            </CardFooter>
          </Card>
  
          <Card className="card">
            <CardHeader>
              <CardTitle><b>Módulos</b></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Organiza los módulos dentro de cada curso. Crea contenido paso a paso y personaliza el flujo de aprendizaje.</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleNavigate('/admin/modules')} className="rounded-full">Gestionar Módulos</Button>
            </CardFooter>
          </Card>
  
          <Card className="card">
            <CardHeader>
              <CardTitle><b>Exámenes</b></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Crea y edita exámenes para evaluar el progreso de los estudiantes. Personaliza preguntas, calificaciones y retroalimentación para cada curso.</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleNavigate('/admin/exams')} className="rounded-full">Gestionar Exámenes</Button>
            </CardFooter>
          </Card>
  
          <Card className="card">
            <CardHeader>
              <CardTitle><b>Miembros</b></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Visualiza y gestiona a los miembros de cada curso. Asigna roles, sigue su progreso y asegura que estén al día.</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleNavigate('/admin/members')} className="rounded-full">Gestionar Miembros</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  

export default LandingAdmin;
