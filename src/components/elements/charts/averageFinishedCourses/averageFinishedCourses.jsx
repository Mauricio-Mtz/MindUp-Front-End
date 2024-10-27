import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { data } from "./data";
import { Skeleton } from "@/components/ui/skeleton"

export default function AverageFinishedCourses() {
  const [primaryColor, setPrimaryColor] = useState('hsl(221, 83%, 53%)');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simula la espera de la petición
      setLoading(false);
    };

    fetchData();

    const primary = getComputedStyle(document.documentElement).getPropertyValue('--chart-1');
    if (primary) setPrimaryColor(`hsl(${primary.trim()})`);
  }, []);

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>Usuarios Por Curso Finalizado</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        {loading ? (
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
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width="auto"
              height="auto"
              data={data}
              margin={{ right: 30 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="persons" stroke={primaryColor} fill={primaryColor} fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-2">
          <p className="text-medium text-lg">{label}</p>
          <p className="text-sm text-chart-1">
            Personas Promedio: <span className="ml-2">{payload[0].value}</span>
          </p>
        </CardContent>
      </Card>
    );
  }
};
