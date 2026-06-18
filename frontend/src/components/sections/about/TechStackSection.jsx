import { FRONTEND, BACKEND, TOOLS } from '../../../utils/constants.js';
import SectionHeader from '../../ui/SectionHeader.jsx';
import TechCategoryCard from '../../cards/TechCategoryCard.jsx';

export function TechStackSection() {
  return (
    <section className="border-t border-white/10 pt-40">
      <SectionHeader title="Tech Stack" subtitle="Evolving continuously" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <TechCategoryCard title="Frontend" items={FRONTEND} variant="about" />
        <TechCategoryCard title="Backend" items={BACKEND} variant="about" />
        <TechCategoryCard title="Tools" items={TOOLS} variant="about" />
      </div>
    </section>
  );
}

export default TechStackSection;
