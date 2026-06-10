import React from 'react';
import { BarChart3, Terminal, Trophy, Globe } from 'lucide-react';
import SkillTag from '../components/SkillTag.jsx';
import { DSA_SKILLS, TECH_STACK } from '../utils/constants.js';

export function Skills() {
  return (
    <section className="px-10 md:px-20 max-w-7xl mx-auto space-y-40 py-20">
      <div className="max-w-4xl">
        <p className="font-mono text-xs text-[#e9c176] uppercase tracking-[0.3em] mb-6">Capabilities</p>
        <h2 className="font-serif text-7xl text-white mb-10 leading-[0.9]">
          Computational <br />
          Arsenal
        </h2>
        <p className="font-sans text-gray-400 text-xl leading-relaxed font-light">
          A quantifiable approach to problem-solving. Deep expertise in Data Structures, Advanced Algorithms, and systemic
          optimization demonstrated through sustained performance in competitive arenas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-white/5 p-10 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
          <BarChart3 className="text-[#e9c176]/40 mb-10" size={40} />
          <h3 className="font-serif text-3xl mb-10">Codeforces</h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-6xl font-serif text-[#e9c176]">1942</span>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Candidate Master</span>
          </div>
          <div className="pt-10 mt-10 border-t border-white/5 flex gap-10">
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Max Rating</p>
              <p className="text-lg">2015</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Contests</p>
              <p className="text-lg">142</p>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 p-10 rounded-2xl group hover:border-[#e9c176]/20 transition-all">
          <Terminal className="text-[#e9c176]/40 mb-10" size={40} />
          <h3 className="font-serif text-3xl mb-10">LeetCode</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <p className="font-mono text-[10px] text-gray-500 uppercase">Solved Problems</p>
              <p className="text-2xl font-serif">850+</p>
            </div>
            <div className="h-[2px] bg-white/5">
              <div className="h-full bg-[#e9c176] w-[85%]"></div>
            </div>
            <p className="font-mono text-[10px] text-[#e9c176] uppercase tracking-widest pt-4">Global Rank: Top 1.2%</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl flex items-center gap-6">
            <Trophy className="text-[#e9c176]" size={24} />
            <div>
              <p className="font-serif text-xl">ICPC Regional</p>
              <p className="font-mono text-[10px] text-gray-500 uppercase">Rank 14 - 2023</p>
            </div>
          </div>
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl flex items-center gap-6">
            <Globe className="text-[#e9c176]" size={24} />
            <div>
              <p className="font-serif text-xl">Google Kickstart</p>
              <p className="font-mono text-[10px] text-gray-500 uppercase">Global Top 500</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
        <div className="space-y-12">
          <h3 className="font-serif text-4xl">DSA Mastery</h3>
          <div className="flex flex-wrap gap-3">
            {DSA_SKILLS.map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        </div>
        <div className="space-y-12">
          <h3 className="font-serif text-4xl">Technical Stack</h3>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tool, idx) => (
              <SkillTag key={tool} skill={tool} isHighlight={idx === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
