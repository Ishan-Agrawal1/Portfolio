import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../utils/constants.js';

export function Navbar({ isMenuOpen, onToggleMenu }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-10 md:px-20 py-6">
      <NavLink
        to="/"
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <img src="/assets/logo.png" alt="ISHAN.DEV" className="h-10" />
        <span className="font-serif text-xl text-white tracking-widest uppercase italic hover:text-[#e9c176] transition-colors"></span>
      </NavLink>

      <div className="hidden md:flex gap-10 items-center">
        {NAV_ITEMS.slice(0, 4).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative group ${isActive ? 'text-[#e9c176]' : 'text-gray-300 hover:text-[#e9c176]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-[#e9c176] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <NavLink
          to="/contact"
          className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-[#e9c176] border border-[#e9c176] px-8 py-3 rounded-md hover:bg-[#e9c176] hover:text-black transition-all duration-300"
        >
          Contact Me
        </NavLink>
        <button className="md:hidden text-white" onClick={onToggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
