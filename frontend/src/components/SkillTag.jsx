import React from 'react';

export function SkillTag({ skill, isHighlight = false }) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-widest px-6 py-3 rounded-full transition-all cursor-pointer ${
        isHighlight
          ? 'bg-[#e9c176] text-black font-bold'
          : 'border border-white/10 hover:border-[#e9c176] hover:text-[#e9c176]'
      }`}
    >
      {skill}
    </span>
  );
}

export default SkillTag;
