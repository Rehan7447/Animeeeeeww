import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import dynamic from "next/dynamic";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header />
      <ThemeToggle />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 container mx-auto p-4 md:ml-64">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
