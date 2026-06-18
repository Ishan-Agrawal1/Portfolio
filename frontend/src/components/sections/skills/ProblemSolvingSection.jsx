import SectionHeader from '../../ui/SectionHeader.jsx';
import StatCard from '../../cards/StatCard.jsx';
import LeetCodeStatsCard from '../../cards/coding/LeetCodeStatsCard.jsx';
import GeeksforGeeksCard from '../../cards/coding/GeeksforGeeksCard.jsx';
import CoreConceptsCard from '../../cards/CoreConceptsCard.jsx';

export function ProblemSolvingSection({ lc, gfg, loading }) {
  return (
    <section className="border-t border-white/10 pt-40">
      <SectionHeader title="Problem Solving" subtitle="Real-time Sync" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Questions" value={1000} suffix="+" description="Across all platforms" />
        <StatCard title="Active Days" value={350} suffix="+" description="Consistent practice" />
        <LeetCodeStatsCard data={lc} loading={loading} />
        <GeeksforGeeksCard data={gfg} loading={loading} />
      </div>
      <CoreConceptsCard />
    </section>
  );
}

export default ProblemSolvingSection;
