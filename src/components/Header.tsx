"use client";
import React from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Animeeeeeww
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/search" className="hover:underline">
            Search
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/favorites" className="hover:underline">
            Favorites
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
