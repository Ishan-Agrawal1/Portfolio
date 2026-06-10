import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import AchievementsCard from '../components/AchievementsCard.jsx';

export function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        const response = await fetch(`${apiUrl}/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <section id="home" className="min-h-[80vh] flex flex-col justify-center px-10 md:px-20 max-w-7xl mx-auto relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-[#0a0a0a] opacity-50 -z-10 pointer-events-none rounded-3xl blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="font-mono text-xs text-[#e9c176] uppercase tracking-[0.3em] mb-6">
            FULL STACK DEVELOPER • SOFTWARE ENGINEER
          </p>
          <h1 className="font-serif text-6xl md:text-8xl text-white mb-8 leading-[1.1] tracking-tight">
            Algorithmic Thinking <br />
            <span className="italic text-gray-400">Meets Modern Web Development</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed font-light">
            Passionate about full-stack development, competitive programming, and building performant digital products.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <button
              onClick={() => navigate('/contact')}
              className="font-mono text-xs uppercase tracking-widest text-white bg-transparent border border-[#e9c176] px-10 py-5 rounded-full hover:bg-[#e9c176] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(233,193,118,0.1)] hover:shadow-[0_0_20px_rgba(233,193,118,0.3)]"
            >
              Let's Connect
            </button>

            <button>
              <a
                href="https://drive.google.com/file/d/1KH4lXkhG0uYClPWcQpCZQqk7O7JYP49R/view?usp=drive_link"
                target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-gray-300 hover:text-[#e9c176] border-b border-gray-600 pb-1 flex items-center gap-2 transition-all"
              >
                View Resume <ArrowUpRight size={14} />
              </a>
            </button>
            
          </div>
        </motion.div>

        {/* Animated Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden lg:block pointer-events-none"
        >
          <div className="relative w-full h-full">
            {/* Gradient fade overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent via-transparent to-[#0A0A0A]"></div>
            
            <img
              src="/assets/image.png"
              alt="Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top rounded-full border border-white/10"
            />
          </div>
        </motion.div>


        {/* Ticker */}
        <div className="w-full border-y border-white/10 bg-[#0a0a0a] py-10 overflow-hidden relative mt-40 -mx-10 md:-mx-20">
          <div className="flex gap-20 items-center whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center">
                {['C++', 'React', 'Node.js', 'MongoDB', 'Socket.IO', 'Tailwind', 'Express', 'MySQL', 'AI Integration', 'OOPS', 'DBMS', 'Algorithms', 'Data Structures'].map((tech, idx) => (
                  <span key={idx}>
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-[0.4em]">{tech}</span>
                    <span className="text-gray-700 mx-5">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
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
                <button
                  onClick={() => navigate('/projects')}
                  className="font-mono mt-10 text-xs uppercase tracking-widest text-white bg-transparent border border-[#e9c176] px-10 py-5 rounded-full hover:bg-[#e9c176] hover:text-black transition-all duration-300"
                >
                  View All Projects
                </button>
              </div>
              <div className="md:col-span-2">
                <AchievementsCard />
                <button
                  onClick={() => navigate('/skills')}
                  className="font-mono mt-10 text-xs uppercase tracking-widest text-white bg-transparent border border-[#e9c176] px-10 py-5 rounded-full hover:bg-[#e9c176] hover:text-black transition-all duration-300"
                >
                  View All Skills
                </button>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
}

export default Home;
