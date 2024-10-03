import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef } from "react";
import "keen-slider/keen-slider.min.css";

export default function Carousel() {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slidesPerView: 1,
    mode: "snap",
    spacing: 10,
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    // Iniciar el intervalo para cambiar de slide cada 3 segundos
    intervalRef.current = setInterval(() => {
      if (slider.current) {
        slider.current.next();
      }
    }, 3000); // 3000 milisegundos = 3 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalRef.current);
  }, [slider]);

  return (
    <div ref={sliderRef} className="keen-slider w-full h-full mx-full rounded-lg shadow-md ">
      <div className="keen-slider__slide number-slide1">
        <img
          src="/image/imgEscribir.jpg"
          alt="Slide 1"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="keen-slider__slide number-slide2">
        <img
          src="/image/imgEscribir.jpg"
          alt="Slide 2"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="keen-slider__slide number-slide3">
        <img
          src="/image/imgEscribir.jpg"
          alt="Slide 3"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
