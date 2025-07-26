import React from "react";
import Link from "next/link";

const Sidebar = () => (
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
    </nav>
  </aside>
);

export default Sidebar;
