import { heroBackground } from '../assets/images/luxuryShots';

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[700px] items-center overflow-hidden px-6 md:px-12 lg:px-20">
      <div
        className="absolute inset-0 hero-zoom bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 max-w-2xl text-white">
        <p className="animate-fade-up font-display text-6xl tracking-wide md:text-8xl">Elegance</p>
        <h1
          className="animate-fade-up mt-2 text-base uppercase tracking-[0.42em] text-zinc-200 md:text-lg"
          style={{ animationDelay: '120ms' }}
        >
          Móveis Planejados
        </h1>
        <p
          className="animate-fade-up mt-8 max-w-xl text-lg text-zinc-300 md:text-xl"
          style={{ animationDelay: '240ms' }}
        >
          Ambientes autorais para quem reconhece o valor do design atemporal.
        </p>
        <button
          className="animate-fade-up mt-12 border border-zinc-300/70 px-8 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black"
          style={{ animationDelay: '360ms' }}
        >
          Agendar Consultoria
        </button>
      </div>
    </section>
  );
}
