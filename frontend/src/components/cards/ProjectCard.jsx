import React from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

export function ProjectCard({ project, index, onViewDetails, className = '' }) {
  return (
    <>
      <article
        className={`group relative rounded-xl overflow-hidden bg-[#141414] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-[#e9c176]/20 flex flex-col ${className}`}
      >
        <div
          className={`aspect-video w-full bg-[#1a1a1a] relative overflow-hidden`}
        >
          <img
            src={project.thumbnail || `https://picsum.photos/seed/${project.title}/800/600`}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"></div>
        </div>

        <div className="p-8 relative z-10 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2 flex-wrap">
              {project.techStack?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-gray-700 text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {project.techStack?.length > 3 && (
                <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-gray-700 text-gray-400 rounded-full">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[#e9c176] transition-colors">
            {project.title}
          </h3>

          <p className="font-sans text-sm leading-relaxed text-gray-400 max-w-2xl line-clamp-3 mb-6 flex-grow">
            {project.shortDescription || project.description || 'A fascinating project capturing complex solutions.'}
          </p>

          <div className="mt-auto flex justify-between">
            <button
              onClick={() => onViewDetails && onViewDetails(project)}
              className="flex items-center text-sm font-semibold tracking-wider uppercase text-[#e9c176] hover:text-white transition-colors gap-2"
            >
              View Project <ArrowRight size={14} />
            </button>

            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Github Repository"
                >
                  <Github size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#e9c176]/10 hover:bg-[#e9c176]/20 border border-[#e9c176]/30 text-[#e9c176] rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
                  title="Live Demo"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default ProjectCard;
