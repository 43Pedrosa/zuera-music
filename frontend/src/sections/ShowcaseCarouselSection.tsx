import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { showcaseSlides } from '../assets/images/luxuryShots';

const AUTOPLAY_MS = 6500;

export function ShowcaseCarouselSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slidesCount = useMemo(() => showcaseSlides.length, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slidesCount);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isPaused, slidesCount]);

  return (
    <section className="bg-[#0a0a0a] py-10 md:py-16">
      <div
        className="group relative mx-auto h-[72vh] w-[92%] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {showcaseSlides.map((slide, index) => {
          const isActive = index === active;
          return (
            <article
              key={slide.title}
              className={`absolute inset-0 transition-all duration-[1300ms] ${
                isActive ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
              }`}
            >
              <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/35" />
              <p className="absolute bottom-10 left-8 font-display text-2xl text-white md:text-4xl">
                {slide.title}
              </p>
            </article>
          );
        })}

        <button
          aria-label="Slide anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 border border-zinc-100/50 p-2 text-zinc-100 backdrop-blur transition hover:bg-zinc-100 hover:text-black"
          onClick={() => setActive((current) => (current - 1 + slidesCount) % slidesCount)}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Próximo slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 border border-zinc-100/50 p-2 text-zinc-100 backdrop-blur transition hover:bg-zinc-100 hover:text-black"
          onClick={() => setActive((current) => (current + 1) % slidesCount)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
