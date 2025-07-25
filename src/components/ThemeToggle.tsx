import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setDark(saved === 'dark');
  }, []);

  return (
    <button
      className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
