import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 container mx-auto p-4 md:ml-64">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
// removed unused dynamic import
