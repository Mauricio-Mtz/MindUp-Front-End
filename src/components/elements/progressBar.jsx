import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

export function ProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
            const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 5)); // Incrementa el progreso o reinicia
            }, 100); // Controla la velocidad del progreso (100ms por paso)

            return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
    }, []);

    return <Progress value={progress} className="w-[100%]" />;
}
