import TypingCodeSnippet from '../../cards/TypingCodeSnippet.jsx';

export function SkillsHero() {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-center gap-12">
      <div className="max-w-2xl">
        <p className="font-mono text-xs text-[#e9c176] uppercase tracking-[0.3em] mb-6">Capabilities</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-10 leading-[0.9]">
          Technical <br />
          <span className="italic text-gray-400">Expertise</span>
        </h2>
        <p className="font-sans text-gray-400 text-xl leading-relaxed font-light">
          I combine strong problem-solving, full-stack development, and modern technologies to build efficient and user-focused applications.
        </p>
      </div>
      <TypingCodeSnippet />
    </section>
  );
}

export default SkillsHero;
