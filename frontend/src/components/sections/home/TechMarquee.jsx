const TECH_ITEMS = ['C++', 'React', 'Node.js', 'MongoDB', 'Socket.IO', 'Tailwind', 'Express', 'MySQL', 'AI Integration', 'OOPS', 'DBMS', 'Algorithms', 'Data Structures'];

export function TechMarquee() {
  return (
    <div className="w-full border-y border-white/10 bg-[#0a0a0a] py-10 overflow-hidden relative mt-40 -mx-10 md:-mx-20">
      <div className="flex gap-20 items-center whitespace-nowrap animate-marquee">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-20 items-center">
            {TECH_ITEMS.map((tech, idx) => (
              <span key={idx}>
                <span className="font-mono text-xs text-gray-400 uppercase tracking-[0.4em]">{tech}</span>
                <span className="text-gray-700 mx-5">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;
