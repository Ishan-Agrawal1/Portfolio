import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Logo + Badge */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase">Back to Site</span>
            </NavLink>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#e9c176]" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#e9c176]">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Right: Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm group"
          >
            <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase">Logout</span>
            <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
