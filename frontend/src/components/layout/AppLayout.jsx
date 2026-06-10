import React, { useState } from 'react';
import Navbar from '../Navbar.jsx';
import MobileMenu from './MobileMenu.jsx';
import Footer from '../Footer.jsx';

export default function AppLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <div className="text-white selection:bg-[#e9c176]/30 selection:text-[#e9c176] min-h-screen flex flex-col overflow-x-hidden font-sans">
      {/* Navbar */}
      <Navbar
        isMenuOpen={isMobileMenuOpen}
        onToggleMenu={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => toggleMobileMenu()}
      />

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-40">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
