import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

interface CarouselProps {
  slides: string[];
  options?: EmblaOptionsType;
}

const Carousel: React.FC<CarouselProps> = ({ slides, options }) => {
  const [viewportRef, embla] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden w-full" ref={viewportRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="relative min-w-full overflow-hidden" key={index}>
              <img src={slide} className="block w-full h-auto" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 disabled:opacity-30 transition-all duration-300 hover:bg-opacity-75 hover:before:scale-110 focus:outline-none before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-white before:bg-opacity-25 before:scale-0 before:transition-transform before:duration-300"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 disabled:opacity-30 transition-all duration-300 hover:bg-opacity-75 hover:before:scale-110 focus:outline-none before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-white before:bg-opacity-25 before:scale-0 before:transition-transform before:duration-300"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
