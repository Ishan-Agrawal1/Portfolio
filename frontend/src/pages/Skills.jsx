import useCodingProfiles from '../hooks/useCodingProfiles.js';
import SkillsHero from '../components/sections/skills/SkillsHero.jsx';
import CompetitiveProgrammingSection from '../components/sections/skills/CompetitiveProgrammingSection.jsx';
import ProblemSolvingSection from '../components/sections/skills/ProblemSolvingSection.jsx';
import TechnicalSkillsSection from '../components/sections/skills/TechnicalSkillsSection.jsx';

export function Skills() {
  const { data, loading } = useCodingProfiles();

  const cf = data?.codeforces?.error ? null : data?.codeforces;
  const lc = data?.leetcode?.error ? null : data?.leetcode;
  const cc = data?.codechef?.error ? null : data?.codechef;
  const gfg = data?.geeksforgeeks?.error ? null : data?.geeksforgeeks;

  return (
    <div className="px-10 md:px-20 max-w-7xl mx-auto space-y-40 py-20">
      <SkillsHero />
      <CompetitiveProgrammingSection cf={cf} lc={lc} cc={cc} loading={loading} />
      <ProblemSolvingSection lc={lc} gfg={gfg} loading={loading} />
      <TechnicalSkillsSection />
    </div>
  );
}

export default Skills;
