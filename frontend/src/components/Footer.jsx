import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '../utils/constants.js';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-20 px-10 md:px-20 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          © ISHAN.DEV — Designed & developed by Ishan Agrawal
        </div>
        <div className="flex gap-4 items-center">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg text-gray-400 hover:text-[#e9c176] hover:border-[#e9c176] transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={18} strokeWidth={1.5} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg text-gray-400 hover:text-[#e9c176] hover:border-[#e9c176] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
          <a
            href={SOCIAL_LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg hover:opacity-80 transition-all duration-300"
            aria-label="LeetCode"
          >
            <img src="/assets/leetcode.png" alt="LeetCode" className="w-[38px] h-[38px] opacity-60 hover:opacity-100" />
          </a>
          <a
            href={SOCIAL_LINKS.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg hover:opacity-80 transition-all duration-300"
            aria-label="Codeforces"
          >
            <img src="/assets/code-forces.png" alt="Codeforces" className="w-[38px] h-[38px] opacity-60 hover:opacity-100" />
          </a>
          <a
            href={SOCIAL_LINKS.codechef}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg hover:opacity-80 transition-all duration-300"
            aria-label="CodeChef"
          >
            <img src="/assets/codechef.png" alt="CodeChef" className="w-[38px] h-[38px] opacity-60 hover:opacity-100" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
