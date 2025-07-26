"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { dark, setDark } = useTheme();
  return (
    <button
      className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
