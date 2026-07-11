import { COURSES } from '../../utils/constants.js';
import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';

export function EducationCard() {
  return (
    <BorderGlow
      backgroundColor="#141414"
      borderRadius={16}
      glowColor="40 80 80"
      colors={['#e9c176', '#f472b6', '#38bdf8']}
    >
      <div className="p-12 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-serif text-3xl mb-2">BTech. in Information Technology</h3>
            <p className="text-[#e9c176] font-sans">IIIT Vadodara</p>
          </div>
          <span className="font-mono text-[10px] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
            2024 - 2028
          </span>
        </div>

        <span className="font-mono text-[12px] bg-white/5 px-4 py-2 border border-white/10 uppercase tracking-widest">CGPA : 8.51</span>

        <div className="space-y-6">
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-12">Key Coursework</p>
          <div className="flex flex-wrap gap-2">
            {COURSES.map((course) => (
              <span
                key={course}
                className="font-mono text-[10px] border border-white/10 px-4 py-2 hover:border-[#e9c176] transition-colors"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BorderGlow>
  );
}

export default EducationCard;
