import { useNavigate } from 'react-router-dom';
import ProjectCard from '../../cards/ProjectCard.jsx';
import AchievementsCard from '../../cards/AchievementsCard.jsx';
import LoadingSpinner from '../../LoadingSpinner.jsx';
import CTAButton from '../../ui/CTAButton.jsx';

export function FeaturedWorkSection({ projects, loading }) {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-10 md:px-20 max-w-7xl mx-auto">
      <h2 className="font-serif text-5xl text-white mb-12">Featured Work</h2>
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        projects.length > 0 && (
          <div className="grid md:grid-cols-5 gap-8 items-stretch mb-12">
            <div className="md:col-span-3">
              <ProjectCard project={projects[0]} index={1} className="h-full" />
              <CTAButton onClick={() => navigate('/projects')} className="mt-10">
                View All Projects
              </CTAButton>
            </div>
            <div className="md:col-span-2">
              <AchievementsCard />
              <CTAButton onClick={() => navigate('/skills')} className="mt-10">
                View All Skills
              </CTAButton>
            </div>
          </div>
        )
      )}
    </section>
  );
}

export default FeaturedWorkSection;
