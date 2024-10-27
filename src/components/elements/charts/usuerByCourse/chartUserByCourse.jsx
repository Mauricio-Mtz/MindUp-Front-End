import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data } from "./data";
import { Skeleton } from "@/components/ui/skeleton"

const BarChartComponent = () => {
  const [primaryColor, setPrimaryColor] = useState('hsl(221, 83%, 53%)');
  const [secondaryColor, setSecondaryColor] = useState('hsl(12, 76%, 61%)');
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Simular petición a un servidor con un tiempo de espera
    const fetchData = async () => {
      setLoading(true); // Mostrar barra de progreso
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simula la espera de la petición
      setLoading(false); // Oculta la barra de progreso cuando se completa la carga
    };

    fetchData();

    // Configurar los colores según el tema
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--chart-1');
    const secondary = getComputedStyle(document.documentElement).getPropertyValue('--chart-2');
    if (primary) setPrimaryColor(`hsl(${primary.trim()})`);
    if (secondary) setSecondaryColor(`hsl(${secondary.trim()})`);
  }, []);

  return (
    <>
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle>Usuarios por cursos</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          {loading ? (
            // Mostrar barra de progreso mientras los datos están cargando           
            <div className="w-full flex align-center justify-center">
              <div className="gap-6 flex mr-30 h-[200px] py-5">
                <Skeleton className="w-[40px] h-full" />                  
                <Skeleton className="w-[40px] h-full" />                  
                <Skeleton className="w-[40px] h-full" />                  
                <Skeleton className="w-[40px] h-full" />                                                      
                <Skeleton className="w-[40px] h-full" />                                                      
              </div>
            </div>          
          ) : (
            // Mostrar gráfico cuando los datos se han cargado
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                width="auto"
                height="auto"
                data={data}
                margin={{ right: 30 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="courses" fill={primaryColor} radius={4} />
                <Bar dataKey="persons" fill={secondaryColor} radius={4} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default BarChartComponent;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-2">
          <p className="text-medium text-lg">{label}</p>
          <p className="text-sm text-chart-1">
            Total cursos: <span className="ml-2">{payload[0].value}</span>
          </p>
          <p className="text-sm text-chart-2">
            Personas: <span className="ml-2">{payload[1].value}</span>
          </p>
        </CardContent>
      </Card>
    );
  }
};
