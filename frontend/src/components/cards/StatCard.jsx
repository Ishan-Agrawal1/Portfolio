import AnimatedNumber from '../ui/AnimatedNumber.jsx';
import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';

export function StatCard({ title, value, suffix = '', description }) {
  return (
    <BorderGlow
      backgroundColor="#141414"
      borderRadius={16}
      glowColor="40 80 80"
      colors={['#e9c176', '#f472b6', '#38bdf8']}
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-serif text-2xl">{title}</h3>
        </div>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-5xl font-serif text-[#e9c176]">
            <AnimatedNumber value={value} />{suffix}
          </span>
        </div>
        <p className="font-mono text-[10px] text-gray-400">{description}</p>
      </div>
    </BorderGlow>
  );
}

export default StatCard;
