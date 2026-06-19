import React, { useState, useEffect } from 'react';
import { X, Github, ExternalLink, PlayCircle } from 'lucide-react';

export function ProjectDrawer({ project, isOpen, onClose }) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full bg-[#0c0c0c] z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          backgroundImage: `radial-gradient(circle at 50% -10%, rgba(233, 193, 118, 0.15) 0%, rgba(12, 12, 12, 1) 40%), url('/assets/darker_texture.png')`,
          backgroundAttachment: 'local, fixed',
          backgroundSize: '100% 100%, cover'
        }}
      >
        {/* Close Button */}
        <div className="absolute top-8 right-8 z-50">
          <button
            onClick={onClose}
            className="p-3 bg-black/40 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
        </div>

        <div className="max-w-5xl mx-auto w-full px-6 py-10 pb-32 flex flex-col gap-40">

          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-4xl mx-auto">
            <p className="font-mono text-[11px] text-[#e9c176] uppercase tracking-[0.3em]">
              {project.category || 'Featured Project'}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white opacity-80 font-light tracking-wide">{project.title}</h2>
            <p className="text-gray-400 font-sans text-base md:text-lg font-light leading-relaxed max-w-2xl">
              {project.shortDescription || project.description || 'A fascinating project capturing complex solutions.'}
            </p>
          </div>

          {/* Video / macOS Window Preview */}
          <div className="w-full rounded-xl overflow-hidden bg-[#141414] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* macOS title bar */}
            <div className="h-12 bg-[#1a1a1a] border-b border-white/10 flex items-center px-4 gap-2 relative">
              <div className="flex gap-2 absolute left-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-[10px] text-gray-500 font-mono tracking-wider bg-black/50 px-4 py-1.5 rounded-md">
                  {project.liveUrl ? new URL(project.liveUrl).hostname : 'localhost:3000'}
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="aspect-[16/9] relative bg-black flex items-center justify-center">
              {project.demoVideo ? (
                <video
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                  src={project.demoVideo}
                  poster={project.thumbnail}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <img
                    src={project.thumbnail || `https://picsum.photos/seed/${project.title}/1280/720`}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-white/50 font-mono text-sm tracking-widest mt-4 uppercase">Preview Not Available</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-transparent border border-[#e9c176] text-[#e9c176] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#e9c176] hover:text-black transition-all duration-300"
              >
                <ExternalLink size={20} />
                Live Link
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-transparent border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:border-white transition-all duration-300"
              >
                <Github size={20} />
                Source Code
              </a>
            )}
          </div>

          {/* Two Column Layout: About & Built With */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pt-20 border-t border-white/25">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-serif text-3xl md:text-5xl text-white">About the Project</h3>
              <div className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed space-y-6 font-light">
                <p>{project.fullDescription || project.shortDescription || 'No detailed description available for this project.'}</p>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6">
                <h3 className="text-[11px] font-mono text-[#e9c176] uppercase tracking-[0.2em]">Built With</h3>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Technologies</p>
                    <div className="flex flex-col gap-3">
                      {project.techStack?.map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#e9c176]/50"></div>
                          <span className="text-sm md:text-base text-gray-300 font-medium">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Infrastructure / Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-16 pt-10 border-t border-white/25">
              <div className="text-center space-y-6">
                <h3 className="font-serif text-4xl md:text-5xl text-white">Key Features</h3>
                <p className="text-gray-400 font-sans text-lg md:text-xl max-w-3xl mx-auto font-light">
                  Engineered for stability, speed, and reliability.
                </p>
              </div>

              <div className="p-8 md:p-12 rounded-2xl bg-[#141414]/50 border border-white/5">
                <div className="space-y-4">
                  {project.features.map((feature, i) => {
                    const hasTitle = feature.includes(':');
                    const title = hasTitle ? feature.split(':')[0].trim() : `Feature ${i + 1}`;
                    const desc = hasTitle ? feature.substring(feature.indexOf(':') + 1).trim() : feature;

                    return (
                      <div key={i} className="flex gap-6 border-b border-white/5 pb-8 last:border-0 last:pb-0 group">
                        <div className="text-[#e9c176]/50 group-hover:text-[#e9c176] transition-colors mt-1 flex-shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        <div className="space-y-2">
                          <p className="text-white font-serif text-base leading-relaxed ">{desc}</p>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Footer Call to Action */}
          <div className="pt-24 border-t border-white/10 text-center space-y-10">
            <h3 className="font-serif text-4xl md:text-5xl text-white">Interested in the Process?</h3>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              I'm always open to discussing technical architecture or future collaborations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
              <a
                href="/#contact"
                onClick={onClose}
                className="text-[#e9c176] text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                Get in Touch
              </a>
              <span className="text-white/20">|</span>
              <button
                onClick={onClose}
                className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                View All Projects
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProjectDrawer;