import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';

export function InfoCard({ title, description }) {
  return (
    <BorderGlow
      backgroundColor="#141414"
      borderRadius={16}
      glowColor="40 80 80"
      colors={['#e9c176', '#f472b6', '#38bdf8']}
    >
      <div className="p-12">
        <h3 className="font-serif text-3xl mb-6">{title}</h3>
        <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
          {description}
        </p>
      </div>
    </BorderGlow>
  );
}

export default InfoCard;
