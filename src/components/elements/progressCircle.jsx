import { useState, useEffect } from 'react';

export function ProgressCircle() {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => (prev + 20) % 1000); // Incrementa la rotación y reinicia cuando llega a 360 grados
    }, 100); // Controla la velocidad del giro (100ms por paso)

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  const size = 50;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 3;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#3498db"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75} // Deja una parte sin cubrir para simular el giro
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          transform: `rotate(${rotate}deg)`,
          transformOrigin: '50% 50%',
          transition: 'transform 0.1s linear', // Transición suave
        }}
      />
    </svg>
  );
}
