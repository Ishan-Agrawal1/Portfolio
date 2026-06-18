import { Code2, Terminal, Zap } from 'lucide-react';
import { DSA_SKILLS, TECH_STACK, FRONTEND, BACKEND, TOOLS } from '../../../utils/constants.js';
import SectionHeader from '../../ui/SectionHeader.jsx';
import TechCategoryCard from '../../cards/TechCategoryCard.jsx';

export function TechnicalSkillsSection() {
  return (
    <section className="border-t border-white/10 pt-40">
      <SectionHeader title="Technical Skills" subtitle="Full Stack Development" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <TechCategoryCard title="Languages" items={TECH_STACK} icon={Code2} variant="column" />
        <TechCategoryCard title="Concepts" items={DSA_SKILLS} icon={Zap} variant="wrap" />
        <TechCategoryCard
          title="Full Stack"
          icon={Terminal}
          variant="grouped"
          groups={[
            { label: 'Frontend', items: FRONTEND },
            { label: 'Backend', items: BACKEND },
            { label: 'Tools', items: TOOLS },
          ]}
        />
      </div>
    </section>
  );
}

export default TechnicalSkillsSection;
