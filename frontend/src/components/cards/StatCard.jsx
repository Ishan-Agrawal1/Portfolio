import AnimatedNumber from '../ui/AnimatedNumber.jsx';

export function StatCard({ title, value, suffix = '', description }) {
  return (
    <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
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
  );
}

export default StatCard;
