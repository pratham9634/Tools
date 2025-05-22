'use client';

import React from 'react';
const Navbar = () => {
  const handleRefresh = (e) => {
    e.preventDefault();
    window.location.reload(); // Triggers a soft reload
  };

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-wide">
          🎵 Playlist Duration
        </h1>
        <nav className="space-x-6 hidden md:flex">
          <a
            href="./"
            onClick={handleRefresh}
            className="text-white/90 hover:text-yellow-300 transition font-medium"
          >
            Home
          </a>
          <a
            href="https://github.com/pratham9634"
            target="_blank"
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
      </div>
    </header>
  );
};

export default Navbar;
