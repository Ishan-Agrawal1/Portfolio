import React from 'react';
import ProjectCard from '../components/ProjectCard.jsx';

export function Projects({ projects, loading }) {
  if (loading) {
    return (
      <section className="px-10 md:px-20 max-w-7xl mx-auto space-y-20 py-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-10 md:px-20 max-w-7xl mx-auto space-y-20 py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs text-[#e9c176] uppercase tracking-[0.2em] mb-4">Portfolio</p>
        <h2 className="font-serif text-7xl text-white mb-8 leading-tight">
          Crafting software with <br />
          <span className="italic text-gray-400">precision and purpose.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
