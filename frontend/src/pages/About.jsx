import AboutHero from '../components/sections/about/AboutHero.jsx';
import PhilosophySection from '../components/sections/about/PhilosophySection.jsx';
import EducationSection from '../components/sections/about/EducationSection.jsx';
import TechStackSection from '../components/sections/about/TechStackSection.jsx';
import AchievementsSection from '../components/sections/about/AchievementsSection.jsx';
import BeyondCodingSection from '../components/sections/about/BeyondCodingSection.jsx';

export function About() {
  return (
    <div className="px-10 md:px-20 max-w-7xl mx-auto space-y-40 py-20">
      <AboutHero />
      <PhilosophySection />
      <EducationSection />
      <TechStackSection />
      <AchievementsSection />
      <BeyondCodingSection />
    </div>
  );
}

export default About;
