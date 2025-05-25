'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRefresh = (e) => {
    e.preventDefault();
    window.location.reload(); // Soft reload
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-wide">Tools Station</h1>

        {/* Desktop Navigation */}
        <nav className="space-x-8 hidden md:flex">
          <Link
            href="/"
            onClick={handleRefresh}
            className="text-white/90 hover:text-yellow-300 transition font-medium"
          >
            Home
          </Link>
          <a
            href="https://github.com/pratham9634"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-yellow-300 transition font-medium"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="text-white/90 hover:text-yellow-300 transition font-medium"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-yellow-300 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 px-6 pb-4 pt-2 space-y-3">
          <Link
            href="/"
            onClick={(e) => {
              handleRefresh(e);
              setMenuOpen(false);
            }}
            className="block text-white/90 hover:text-yellow-300 transition font-medium"
          >
            Home
          </Link>
          <a
            href="https://github.com/pratham9634"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/90 hover:text-yellow-300 transition font-medium"
          >
            GitHub
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-white/90 hover:text-yellow-300 transition font-medium"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
