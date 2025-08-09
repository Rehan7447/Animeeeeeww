import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
        <Header />
        <div className="flex flex-1 pb-16 md:pb-0">
          <Sidebar />
          <main className="flex-1 container mx-auto p-4 md:pl-6 md:pr-6 md:ml-64 transition-all duration-300">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
// removed unused dynamic import
