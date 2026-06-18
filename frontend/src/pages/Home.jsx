import useProjects from '../hooks/useProjects.js';
import HomeHero from '../components/sections/home/HomeHero.jsx';
import FeaturedWorkSection from '../components/sections/home/FeaturedWorkSection.jsx';

export function Home() {
  const { projects, loading } = useProjects();

  return (
    <>
      <HomeHero />
      <FeaturedWorkSection projects={projects} loading={loading} />
    </>
  );
}

export default Home;
