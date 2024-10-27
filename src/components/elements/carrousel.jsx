import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef } from "react";
import "keen-slider/keen-slider.min.css";
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function CarouselImg() {
  

 

  return (
    <div className="w-full h-full mx-full  ">
      <Carousel className="rounded-lg shadow-md" plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem >
            <img
              src="/assets/images/imgEscribir.jpg"
              alt="Slide 1"
              className="rounded-lg"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="/assets/images/imgEscribir.jpg"
              alt="Slide 1"
              className=" rounded-lg"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="/assets/images/imgEscribir.jpg"
              alt="Slide 1"
              className=" rounded-lg"
            />
          </CarouselItem>
        </CarouselContent>
        
      </Carousel>
    </div>
  );
}
