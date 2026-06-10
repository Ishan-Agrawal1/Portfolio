import React from 'react';

export function ProjectCard({ project, index, className = '' }) {
  const isLarge = index === 0;

  return (
    <article
      className={`${isLarge ? 'md:col-span-8' : 'md:col-span-4'} group relative rounded-xl overflow-hidden bg-[#141414] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-[#e9c176]/20 flex flex-col ${className}`}
    >
      <div
        className={`${isLarge ? 'aspect-[16/9]' : 'aspect-square md:aspect-auto md:flex-grow'} w-full bg-[#1a1a1a] relative overflow-hidden`}
      >
        <img
          src={project.imageUrl || `https://picsum.photos/seed/${project.title}/800/600`}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
      </div>

      <div className="p-8 relative z-10">
        <div className="flex gap-3 mb-4 flex-wrap">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-gray-700 text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[#e9c176] transition-colors">
          {project.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-gray-300 max-w-2xl line-clamp-3">
          {project.description}
        </p>
      </div>
    </article>
  );
}

export default ProjectCard;
