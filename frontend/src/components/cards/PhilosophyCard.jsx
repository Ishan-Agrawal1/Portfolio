import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';

export function PhilosophyCard({ title, icon: Icon, description }) {
  return (
    <BorderGlow
      backgroundColor="#141414"
      borderRadius={16}
      glowColor="40 80 80"
      colors={['#e9c176', '#f472b6', '#38bdf8']}
    >
      <div className="p-12 group">
        <div className="flex justify-between items-start mb-8">
          <h3 className="font-serif text-3xl">{title}</h3>
          <Icon className="text-[#e9c176]/40 group-hover:text-[#e9c176] transition-colors" size={32} />
        </div>
        <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
          {description}
        </p>
      </div>
    </BorderGlow>
  );
}

export default PhilosophyCard;
