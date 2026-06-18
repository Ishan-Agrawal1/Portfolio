import ProjectCard from '../components/cards/ProjectCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ProjectsHeader from '../components/sections/projects/ProjectsHeader.jsx';

export function Projects({ projects, loading }) {
  if (loading) {
    return (
      <section className="px-10 md:px-20 max-w-7xl mx-auto space-y-20 py-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="px-10 md:px-20 max-w-7xl mx-auto space-y-20 py-20">
      <ProjectsHeader />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
