import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';

export function TechCategoryCard({ title, items, icon: Icon, variant = 'simple', groups }) {
  if (variant === 'grouped') {
    return (
      <BorderGlow
        backgroundColor="#141414"
        borderRadius={16}
        glowColor="40 80 80"
        colors={['#e9c176', '#f472b6', '#38bdf8']}
      >
        <div className="p-12 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8">
            <h3 className="font-serif text-3xl">{title}</h3>
            {Icon && <Icon className="text-[#e9c176]/40 group-hover:text-[#e9c176] transition-colors" size={24} />}
          </div>
          <div className="space-y-4">
            {groups.map(({ label, items: groupItems }) => (
              <div key={label}>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">{label}</p>
                <div className="space-y-2 flex flex-wrap gap-2">
                  {groupItems.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] border border-white/10 px-3 py-1 hover:border-[#e9c176] transition-colors rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BorderGlow>
    );
  }

  if (variant === 'about') {
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
              <h3 className="font-serif text-3xl mb-2">{title}</h3>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <p
                  key={item}
                  className="font-mono text-[10px] border border-white/10 px-4 py-2 hover:border-[#e9c176] transition-colors"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </BorderGlow>
    );
  }

  const isColumn = variant === 'column';

  return (
    <BorderGlow
      backgroundColor="#141414"
      borderRadius={16}
      glowColor="40 80 80"
      colors={['#e9c176', '#f472b6', '#38bdf8']}
    >
      <div className="p-12 relative overflow-hidden group">
        <div className="flex justify-between items-start mb-8">
          <h3 className="font-serif text-3xl">{title}</h3>
          {Icon && <Icon className="text-[#e9c176]/40 group-hover:text-[#e9c176] transition-colors" size={24} />}
        </div>
        <div className={`space-y-3 flex ${isColumn ? 'flex-col' : 'flex-wrap'} gap-2`}>
          {items.map((item) => (
            <span
              key={item}
              className="font-mono text-[10px] border border-white/10 px-4 py-2 hover:border-[#e9c176] transition-colors rounded"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </BorderGlow>
  );
}

export default TechCategoryCard;
