import SectionHeader from '../../ui/SectionHeader.jsx';
import EducationCard from '../../cards/EducationCard.jsx';
import SchoolTimelineCard from '../../cards/SchoolTimelineCard.jsx';

export function EducationSection() {
  return (
    <section className="border-t border-white/10 pt-40">
      <SectionHeader title="Academic Foundation" subtitle="Continuous Learning" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <EducationCard />
        <SchoolTimelineCard />
      </div>
    </section>
  );
}

export default EducationSection;
