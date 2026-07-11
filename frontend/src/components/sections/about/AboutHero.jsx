import BorderGlow from '../../ui/BorderGlow/BorderGlow.jsx';

export function AboutHero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="max-w-2xl">
        <p className="font-mono text-[10px] text-[#e9c176] uppercase tracking-[0.4em] mb-4">About me</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl  text-white mb-10 leading-[0.9]">
          Building scalable
          <br />
          <span className="italic text-gray-400">systems for the web. </span>
        </h1>
        <p className="font-sans text-gray-400 text-lg leading-relaxed mb-8">
          Hi! I'm a IT student at IIIT Vadodara passionate about full-stack development, competitive programming, and scalable software systems. I enjoy building modern web applications that combine clean architecture, performance, and intuitive user experiences while continuously exploring emerging technologies like React and Express.
        </p>
      </div>

      <div className="relative group flex justify-end">
        <div className="w-full max-w-md">
          <BorderGlow
            backgroundColor="transparent"
            borderRadius={16}
            glowColor="40 80 80"
            colors={['#e9c176', '#f472b6', '#38bdf8']}
            glowRadius={30}
            glowIntensity={1.2}
            fillOpacity={0}
            animated
          >
            <div className="aspect-[4/5] relative overflow-hidden rounded-2xl">
              <img
                src="/assets/image.png"
                alt="The Architect"
                className="w-full h-full object-cover contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
          </BorderGlow>
        </div>
        <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 border border-white/5 opacity-50"></div>
      </div>
    </section>
  );
}

export default AboutHero;
