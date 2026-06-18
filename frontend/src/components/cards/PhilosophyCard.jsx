export function PhilosophyCard({ title, icon: Icon, description }) {
  return (
    <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
      <div className="flex justify-between items-start mb-8">
        <h3 className="font-serif text-3xl">{title}</h3>
        <Icon className="text-[#e9c176]/40 group-hover:text-[#e9c176] transition-colors" size={32} />
      </div>
      <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}

export default PhilosophyCard;
