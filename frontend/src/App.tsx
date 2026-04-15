import { ConceptSection } from './sections/ConceptSection';
import { HeroSection } from './sections/HeroSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { ProductsSection } from './sections/ProductsSection';
import { ShowcaseCarouselSection } from './sections/ShowcaseCarouselSection';

export default function App() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <HeroSection />
      <ShowcaseCarouselSection />
      <ConceptSection />
      <PortfolioSection />
      <ProductsSection />
    </div>
  );
}
