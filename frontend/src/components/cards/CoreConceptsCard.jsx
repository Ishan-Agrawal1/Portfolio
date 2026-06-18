import SkillTag from '../SkillTag.jsx';
import { DSA_SKILLS } from '../../utils/constants.js';

export function CoreConceptsCard() {
  return (
    <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
      <div className="flex justify-between items-start mb-8">
        <h3 className="font-serif text-3xl">Core Concepts</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {DSA_SKILLS.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default CoreConceptsCard;
