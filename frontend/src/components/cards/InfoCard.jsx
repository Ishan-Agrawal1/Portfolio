export function InfoCard({ title, description }) {
  return (
    <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
      <h3 className="font-serif text-3xl mb-6">{title}</h3>
      <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}

export default InfoCard;
