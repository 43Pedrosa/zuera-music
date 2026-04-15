import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export function ConceptSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className={`mx-auto max-w-5xl transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'translate-y-8 opacity-0'}`}>
        <p className="text-xs uppercase tracking-[0.36em] text-zinc-500">Conceito Elegance</p>
        <p className="mt-8 font-display text-4xl leading-tight text-[#111111] md:text-6xl">
          Criamos espaços que unem silêncio visual, matéria nobre e proporções impecáveis para viver o luxo com naturalidade.
        </p>
      </div>
    </section>
  );
}
