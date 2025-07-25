import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
    <nav className="container mx-auto flex items-center justify-between p-4">
      <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">AnimeHub</Link>
      <div className="flex gap-4">
        <Link href="/search" className="hover:underline">Search</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/favorites" className="hover:underline">Favorites</Link>
        <Link href="/genres" className="hover:underline">Genres</Link>
        <Link href="/profile" className="hover:underline">Profile</Link>
      </div>
    </nav>
  </header>
);

export default Header;
