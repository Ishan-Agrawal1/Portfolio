export function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
      <h2 className="font-serif text-5xl text-white">{title}</h2>
      {subtitle && (
        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">{subtitle}</span>
      )}
    </div>
  );
}

export default SectionHeader;
