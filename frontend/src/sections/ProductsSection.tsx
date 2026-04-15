import { SectionHeading } from '../components/SectionHeading';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const products = [
  {
    title: 'Cozinhas',
    text: 'Ilhas esculturais, marcenaria técnica e acabamentos de padrão internacional.'
  },
  {
    title: 'Closets',
    text: 'Organização refinada com iluminação cênica e materiais de alto desempenho.'
  },
  {
    title: 'Salas',
    text: 'Painéis, estantes e mobiliário integrado para composições atemporais.'
  }
];

export function ProductsSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#0a0a0a] px-6 py-24 md:px-12 lg:px-20">
      <div className={`mx-auto max-w-7xl transition-all duration-700 ${isVisible ? 'opacity-100' : 'translate-y-8 opacity-0'}`}>
        <SectionHeading
          eyebrow="Produtos"
          title="Curadoria para residências extraordinárias"
          description="Soluções desenvolvidas sob medida para integrar arquitetura, estilo de vida e excelência de execução."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.title}
              className="border border-zinc-800 bg-zinc-950/60 p-10 transition hover:border-zinc-600"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <h3 className="font-display text-3xl text-white">{product.title}</h3>
              <p className="mt-4 text-zinc-400">{product.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
