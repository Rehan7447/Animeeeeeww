"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineMenuAlt3,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();

  // Handle scroll event to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogout() {
    await signOut();
    router.replace("/");
    setMenuOpen(false);
  }

  return (
    <header
      className={`bg-background/90 backdrop-blur-md sticky top-0 z-50 w-full transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        {/* Left side with logo and search */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 overflow-hidden">
              <Image
                src="/file.svg"
                alt="Animeeeeeww Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Animeeeeeww
            </span>
          </Link>

          {/* Search input - visible on desktop */}
          <div className="hidden md:flex relative w-80 ml-6">
            <input
              type="text"
              placeholder="Search anime..."
              className="w-full px-4 py-2 pr-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none transition-colors"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                e.currentTarget.value &&
                router.push(
                  `/search?q=${encodeURIComponent(e.currentTarget.value)}`
                )
              }
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => {
                const searchInput = document.querySelector(
                  'input[placeholder="Search anime..."]'
                ) as HTMLInputElement;
                if (searchInput && searchInput.value) {
                  router.push(
                    `/search?q=${encodeURIComponent(searchInput.value)}`
                  );
                }
              }}
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right side with theme toggle, user profile, and navigation */}
        <div className="flex items-center">
          <ThemeToggle />

          {/* User section */}
          {user ? (
            <div className="flex items-center gap-2 ml-3">
              <button
                className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold text-sm"
                title={user.email || ""}
                onClick={() => router.push("/profile")}
              >
                {user.email?.charAt(0).toUpperCase() || "U"}
              </button>

              <Link
                href="/profile"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
              >
                <HiOutlineUser className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition text-sm"
              >
                <HiOutlineLogout className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 ml-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HiOutlineMenuAlt3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-gray-200 dark:border-gray-800 shadow-lg absolute top-full left-0 w-full z-50 animate-fade-in">
          <div className="p-4 space-y-2">
            {/* Mobile search input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full px-4 py-2 pr-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    router.push(
                      `/search?q=${encodeURIComponent(e.currentTarget.value)}`
                    );
                    setMenuOpen(false);
                  }
                }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => {
                  const searchInput = document.querySelector(
                    '.md\\:hidden input[placeholder="Search anime..."]'
                  ) as HTMLInputElement;
                  if (searchInput && searchInput.value) {
                    router.push(
                      `/search?q=${encodeURIComponent(searchInput.value)}`
                    );
                    setMenuOpen(false);
                  }
                }}
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>
            </div>

            {user && (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <HiOutlineUser className="w-5 h-5" />
                  <span>Profile</span>
                </Link>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}

            {!user && (
              <div className="pt-2">
                <Link
                  href="/auth"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
