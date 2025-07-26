"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 w-full">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400"
        >
          Animeeeeeww
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 mb-1 rounded transition-all"
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 mb-1 rounded transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className="block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded transition-all"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            ></span>
          </button>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-2 md:gap-4 items-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          <Link
            href="/search"
            className="px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-sm md:text-base"
          >
            Search
          </Link>
          <Link
            href="/dashboard"
            className="px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-sm md:text-base"
          >
            Dashboard
          </Link>
          <Link
            href="/favorites"
            className="px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-sm md:text-base"
          >
            Favorites
          </Link>
          <Link
            href="/profile"
            className="px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-sm md:text-base"
          >
            Profile
          </Link>
          <Link
            href="/my-list"
            className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition text-sm md:text-base"
          >
            My List
          </Link>
          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg absolute top-full left-0 w-full z-50 animate-fade-in">
          <div className="flex flex-col gap-2 p-4">
            <Link
              href="/search"
              className="px-2 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-base"
              onClick={() => setMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/dashboard"
              className="px-2 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-base"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/favorites"
              className="px-2 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-base"
              onClick={() => setMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              href="/profile"
              className="px-2 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-base"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/my-list"
              className="px-2 py-2 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition text-base"
              onClick={() => setMenuOpen(false)}
            >
              My List
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="mt-2 px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-base"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
