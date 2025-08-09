"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

const ThemeToggle = () => {
  const { dark, setDark } = useTheme();
  
  return (
    <button
      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <HiSun 
          className={`w-full h-full absolute transition-all duration-300 ${
            dark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0'
          }`} 
        />
        {/* Moon icon */}
        <HiMoon 
          className={`w-full h-full absolute transition-all duration-300 ${
            dark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90 scale-50'
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
