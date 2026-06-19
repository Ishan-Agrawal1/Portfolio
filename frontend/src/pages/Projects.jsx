import React, { useState } from 'react';
import ProjectCard from '../components/cards/ProjectCard.jsx';
import ProjectDrawer from '../components/projects/ProjectDrawer.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ProjectsHeader from '../components/sections/projects/ProjectsHeader.jsx';

export function Projects({ projects, loading }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // delay clear for exit animations
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <section className="relative z-10 px-10 md:px-20 max-w-7xl mx-auto space-y-20 py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0c0c0c]">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/darker_texture.png')] opacity-60 bg-fixed pointer-events-none"></div>

      <section className="relative z-10 px-10 md:px-20 max-w-7xl mx-auto space-y-20 py-20">
        <ProjectsHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              onViewDetails={handleOpenDrawer}
            />
          ))}
        </div>
      </section>

      <ProjectDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}

export default Projects;
