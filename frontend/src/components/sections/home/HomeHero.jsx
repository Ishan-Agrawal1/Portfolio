import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import CTAButton from '../../ui/CTAButton.jsx';
import TechMarquee from './TechMarquee.jsx';

export function HomeHero() {
  const navigate = useNavigate();

  return (
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
          <CTAButton
            onClick={() => navigate('/contact')}
            className="shadow-[0_0_15px_rgba(233,193,118,0.1)] hover:shadow-[0_0_20px_rgba(233,193,118,0.3)]"
          >
            Let's Connect
          </CTAButton>

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

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden lg:block pointer-events-none"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent via-transparent to-[#0A0A0A]"></div>
          <img
            src="/assets/image.png"
            alt="Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top rounded-full border border-white/10"
          />
        </div>
      </motion.div>

      <TechMarquee />
    </section>
  );
}

export default HomeHero;
