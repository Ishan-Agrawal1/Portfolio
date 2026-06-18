import SectionHeader from '../../ui/SectionHeader.jsx';
import CodeforcesCard from '../../cards/coding/CodeforcesCard.jsx';
import LeetCodeCard from '../../cards/coding/LeetCodeCard.jsx';
import CodeChefCard from '../../cards/coding/CodeChefCard.jsx';

export function CompetitiveProgrammingSection({ cf, lc, cc, loading }) {
  return (
    <section className="border-t border-white/10 pt-40">
      <SectionHeader title="Competitive Programming" subtitle="Platforms & Achievements" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CodeforcesCard data={cf} loading={loading} />
        <LeetCodeCard data={lc} loading={loading} />
        <CodeChefCard data={cc} loading={loading} />
      </div>
    </section>
  );
}

export default CompetitiveProgrammingSection;
