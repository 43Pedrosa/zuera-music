import { portfolioProjects } from '../assets/images/luxuryShots';
import { SectionHeading } from '../components/SectionHeading';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export function PortfolioSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#f2eee8] px-6 py-20 md:px-12 lg:px-20">
      <div className={`mx-auto max-w-7xl transition-all duration-700 ${isVisible ? 'opacity-100' : 'translate-y-8 opacity-0'}`}>
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos que traduzem identidade e exclusividade"
          description="Cada detalhe nasce de um processo minucioso entre arquitetura, arte e precisão técnica."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <article key={project.title} className="group relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/45" />
              <p className="absolute bottom-8 left-6 translate-y-3 font-display text-3xl text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {project.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
