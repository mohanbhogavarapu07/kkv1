
import React from "react";

export const NavBar = () => (
  <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 px-4 transition-all">
    <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
      <a href="/" className="font-playfair text-2xl font-bold tracking-tight text-primary hover:opacity-90 transition-opacity duration-200">
        Atomic Habits
      </a>
      <div className="flex space-x-4 text-base font-inter">
        <a href="#identity" className="text-gray-600 hover:text-primary transition-colors">Identity</a>
        <a href="#obvious" className="text-gray-600 hover:text-primary transition-colors">Obvious</a>
        <a href="#attractive" className="text-gray-600 hover:text-primary transition-colors">Attractive</a>
        <a href="#easy" className="text-gray-600 hover:text-primary transition-colors">Easy</a>
        <a href="#satisfying" className="text-gray-600 hover:text-primary transition-colors">Satisfying</a>
      </div>
    </div>
  </nav>
);
