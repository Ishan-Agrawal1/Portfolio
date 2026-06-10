import React from 'react';
import { Code2, Terminal, Trophy, Globe, Cpu } from 'lucide-react';
import { BACKEND, COURSES, FRONTEND, TOOLS } from '../utils/constants.js';
import AchievementsCard from '../components/AchievementsCard.jsx';

export function About() {
  return (
    <div className="px-10 md:px-20 max-w-7xl mx-auto space-y-40 py-20">
      {/* Page Header */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] text-[#e9c176] uppercase tracking-[0.4em] mb-4">About me</p>
          <h1 className="font-serif text-7xl text-white mb-10 leading-[0.9]">
            Building scalable
            <br />
            <span className="italic text-gray-400">systems for the web. </span>
          </h1>
          <p className="font-sans text-gray-400 text-lg leading-relaxed mb-8">
           Hi! I'm a IT student at IIIT Vadodara passionate about full-stack development, competitive programming, and scalable software systems. I enjoy building modern web applications that combine clean architecture, performance, and intuitive user experiences while continuously exploring emerging technologies like React and Express.
          </p>
        </div>

        <div className="relative group">
          <div className="aspect-[4/5] bg-[#141414] rounded-2xl overflow-hidden border border-white/5 relative">
            <img
              src="https://picsum.photos/seed/about-portrait/400/500"
              alt="The Architect"
              className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 w-12 h-12 bg-black border border-[#e9c176]/30 flex items-center justify-center rounded-lg">
              <Cpu size={24} className="text-[#e9c176]" />
            </div>
          </div>
          <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 border border-white/5 opacity-50"></div>
        </div>
      </section>

      {/* Technical Philosophy */}
      <section className="border-t border-white/10 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-5xl text-white sticky top-40">
              Technical <br />
              Philosophy
            </h2>
            <h4 className="font-serif text-3xl text-gray-400 sticky top-40 mt-5">
              What I Focus On
            </h4>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-serif text-3xl">Problem Solving</h3>
                <Code2 className="text-[#e9c176]/40 group-hover:text-[#e9c176] transition-colors" size={32} />
              </div>
              <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
                Competitive programming has strengthened my analytical thinking and approach to solving complex problems efficiently. I enjoy optimizing solutions while maintaining readability and clean implementation.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-serif text-3xl"> Development</h3>
                <Terminal className="text-[#e9c176]/40 group-hover:text-[#e9c176] transition-colors" size={32} />
              </div>
              <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
                I build modern full-stack applications focused on performance, scalability, and clean user experiences using technologies like React, Node.js, MongoDB, and Socket.IO.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-serif text-3xl"> Learning</h3>
                <Terminal className="text-[#e9c176]/40 group-hover:text-[#e9c176] transition-colors" size={32} />
              </div>
              <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
                I'm currently exploring blockchain development, real-time applications, and AI-powered systems while continuing to improve my development and problem-solving skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Foundation */}
      <section className="border-t border-white/10 pt-40">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
          <h2 className="font-serif text-5xl text-white">Academic Foundation</h2>
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">Continuous Learning</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="bg-[#141414] p-12 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-3xl mb-2">BTech. in Information Technology</h3>
                <p className="text-[#e9c176] font-sans">IIIT Vadodara</p>
              </div>
              <span className="font-mono text-[10px] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
                2024 - 2028
              </span>
            </div>

            <span className="font-mono text-[12px] bg-white/5 px-4 py-2 border border-white/10 uppercase tracking-widest">CGPA : 8.51</span>

            <div className="space-y-6">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-12">Key Coursework</p>
              <div className="flex flex-wrap gap-2">
                {COURSES.map((course) => (
                  <span
                    key={course}
                    className="font-mono text-[10px] border border-white/10 px-4 py-2 hover:border-[#e9c176] transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#141414] p-12 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-3xl mb-2">Schooling Timeline</h3>
                <p className="text-[#e9c176] font-sans">KENDRIYA VIDYALAYA NO.1 NEEMUCH (M.P.)</p>
              </div>
              <span className="font-mono text-[10px] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
                2012 - 2024
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="font-mono text-[14px] text-gray-500 uppercase tracking-widest mt-12">CLASS 12<sup>th</sup></h2>
              <div className="flex flex-col gap-2">
                <p className='font-mono text-[14px]'>CENTRAL BOARD OF SECONDARY EDUCATION</p>
                
                <div className="flex gap-2 items-center">
                  <p className='font-mono text-[12px]'>PERCENTAGE : 92.8%</p>
                  <span className='font-mono text-[10px]  px-4 py-2 border border-white/10 uppercase tracking-widest ml-auto'>2023-24</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-mono text-[14px] text-gray-500 uppercase tracking-widest mt-12">CLASS 10<sup>th</sup></h2>
              <div className="flex flex-col gap-2">
                <p className='font-mono text-[14px]'>CENTRAL BOARD OF SECONDARY EDUCATION</p>
                
                <div className="flex gap-2 items-center">
                  <p className='font-mono text-[12px]'>PERCENTAGE : 97.4%</p>
                  <span className='font-mono text-[10px]  px-4 py-2 border border-white/10 uppercase tracking-widest ml-auto'>2021-22</span>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      {/* Tech stack */}
      <section className="border-t border-white/10 pt-40">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
          <h2 className="font-serif text-5xl text-white">Tech Stack</h2>
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">Evolving continuously</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="bg-[#141414] p-12 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-3xl mb-2">Frontend</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                {FRONTEND.map((framework) => (
                  <p
                    key={framework}
                    className="font-mono text-[10px] border border-white/10 px-4 py-2 hover:border-[#e9c176] transition-colors"
                  >
                    {framework}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#141414] p-12 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-3xl mb-2">Backend</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                {BACKEND.map((framework) => (
                  <p
                    key={framework}
                    className="font-mono text-[10px] border border-white/10 px-4 py-2 hover:border-[#e9c176] transition-colors"
                  >
                    {framework}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#141414] p-12 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-3xl mb-2">Tools</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                {TOOLS.map((framework) => (
                  <p
                    key={framework}
                    className="font-mono text-[10px] border border-white/10 px-4 py-2 hover:border-[#e9c176] transition-colors"
                  >
                    {framework}
                  </p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Acievements */}
      <section className="border-t border-white/10 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-5xl text-white sticky top-40">
              Achievements
            </h2>
          </div>

          <div className="lg:col-span-8">
            <AchievementsCard></AchievementsCard>
          </div>
        </div>
      </section>

     {/* Beyond Coding */}
     <section className="border-t border-white/10 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-5xl text-white sticky top-40">
              Beyond
              <br></br>
              Coding
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
              <h3 className="font-serif text-3xl mb-6">Sports & Leadership</h3>
              <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
                Beyond coding, I closely follow cricket and casually enjoy watching various sports like hockey and badminton. During school, I served as the Head Boy in Class XII, an experience that helped me develop leadership, responsibility, and communication skills.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
              <h3 className="font-serif text-3xl mb-6">Spirituality & Values</h3>
              <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
                I have a deep interest in spirituality and try to follow its values sincerely in daily life. I believe in maintaining meaningful and long-lasting relationships, balancing practical thinking with empathy and emotional understanding.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/5 p-12 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
              <h3 className="font-serif text-3xl mb-6">Teaching & Sharing</h3>
              <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
                Apart from development and problem solving, I enjoy teaching concepts I know to my friends and my younger brother. Sharing knowledge is something I genuinely find fulfilling, as it reinforces my own understanding while helping others grow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
