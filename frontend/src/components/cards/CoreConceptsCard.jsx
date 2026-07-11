import SkillTag from '../SkillTag.jsx';
import { DSA_SKILLS } from '../../utils/constants.js';
import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';

export function CoreConceptsCard() {
  return (
    <BorderGlow
      backgroundColor="#141414"
      borderRadius={16}
      glowColor="40 80 80"
      colors={['#e9c176', '#f472b6', '#38bdf8']}
    >
      <div className="p-12">
        <div className="flex justify-between items-start mb-8">
          <h3 className="font-serif text-3xl">Core Concepts</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {DSA_SKILLS.map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </BorderGlow>
  );
}

export default CoreConceptsCard;
