import React from "react";
import Link from "next/link";

const Sidebar = () => (
  <>
    {/* Desktop Sidebar */}
    <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r h-full fixed top-0 left-0 pt-20 z-40">
      <nav className="flex flex-col gap-2 p-4">
      <Link
        href="/"
        className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Home
      </Link>
      <Link
        href="/search"
        className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Search
      </Link>
      <Link
        href="/dashboard"
        className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Dashboard
      </Link>
      <Link
        href="/favorites"
        className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Favorites
      </Link>
      <Link
        href="/profile"
        className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Profile
      </Link>
      <Link
        href="/my-list"
        className="py-2 px-4 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
      >
        My List
      </Link>
    </nav>
    </aside>
    {/* Mobile Bottom Nav */}
    <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t z-50 flex justify-around items-center py-2 shadow-lg">
      <Link href="/" className="flex flex-col items-center text-xs px-2 py-1 hover:text-blue-600 dark:hover:text-blue-300">
        <span>Home</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center text-xs px-2 py-1 hover:text-blue-600 dark:hover:text-blue-300">
        <span>Search</span>
      </Link>
      <Link href="/dashboard" className="flex flex-col items-center text-xs px-2 py-1 hover:text-blue-600 dark:hover:text-blue-300">
        <span>Dashboard</span>
      </Link>
      <Link href="/favorites" className="flex flex-col items-center text-xs px-2 py-1 hover:text-blue-600 dark:hover:text-blue-300">
        <span>Favs</span>
      </Link>
      <Link href="/my-list" className="flex flex-col items-center text-xs px-2 py-1 text-blue-700 dark:text-blue-300 font-semibold">
        <span>My List</span>
      </Link>
    </nav>
  </>
);

export default Sidebar;
