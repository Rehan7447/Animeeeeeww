"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineHome, HiOutlineSearch, HiOutlineViewGrid, HiOutlineStar, 
  HiOutlineUser, HiOutlineClipboardList, HiOutlineChartBar,
  HiOutlineCog, HiOutlineBookOpen, HiOutlineFilm, HiOutlineLogin } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  
  // Store collapsed state in localStorage to persist
  useEffect(() => {
    // Load initial state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setCollapsed(savedState === 'true');
    }
    
    // Save state changes to localStorage
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  }, [collapsed]);
  
  const isActive = (path: string) => pathname === path;
  
  // Items visible to all users, logged in or not
  const publicNavItems = [
    { name: "Home", path: "/", icon: HiOutlineHome },
    { name: "Search", path: "/search", icon: HiOutlineSearch },
    { name: "Top Anime", path: "/top", icon: HiOutlineChartBar },
    { name: "Seasonal", path: "/seasonal", icon: HiOutlineBookOpen },
    { name: "Movies", path: "/movies", icon: HiOutlineFilm },
  ];
  
  // Items visible only to authenticated users
  const authNavItems = [
    { name: "Dashboard", path: "/dashboard", icon: HiOutlineViewGrid },
    { name: "My List", path: "/my-list", icon: HiOutlineClipboardList },
    { name: "Favorites", path: "/favorites", icon: HiOutlineStar },
  ];
  
  // Get navigation items based on auth status
  const mainNavItems = user 
    ? [...publicNavItems, ...authNavItems]
    : publicNavItems;
  
  // Account-related items (only for authenticated users)
  const secondaryNavItems = user ? [
    { name: "Profile", path: "/profile", icon: HiOutlineUser },
    { name: "Statistics", path: "/statistics", icon: HiOutlineChartBar },
    { name: "Settings", path: "/settings", icon: HiOutlineCog },
  ] : [
    { name: "Sign In", path: "/auth", icon: HiOutlineLogin }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex flex-col h-full fixed top-0 left-0 pt-20 z-40 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } bg-background border-r border-gray-200 dark:border-gray-800`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Main Navigation */}
          <nav className="flex flex-col gap-1 p-3">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            ))}
          </nav>
          
          {/* Divider */}
          <div className="mx-3 my-2 border-t border-gray-200 dark:border-gray-800"></div>
          
          {/* Secondary Navigation */}
          <nav className="flex flex-col gap-1 p-3">
            <div className={`text-xs text-gray-500 dark:text-gray-400 font-medium px-3 py-2 ${collapsed ? 'sr-only' : ''}`}>
              Account
            </div>
            {secondaryNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            ))}
          </nav>
          
          {/* No more explicit Explore Section as those items are now part of the main navigation */}
          
          {/* Collapse button */}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="mt-4 mx-3 mb-4 py-2 px-3 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
            >
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
            {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
          </button>
        </div>
      </aside>
      
      {/* Mobile Bottom Nav */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-background border-t border-gray-200 dark:border-gray-800 z-50 flex justify-around items-center py-2 px-1 shadow-lg">
        {mainNavItems.slice(0, 5).map((item) => (
          <Link 
            key={item.path}
            href={item.path} 
            className={`flex flex-col items-center justify-center text-xs p-1.5 rounded-lg ${
              isActive(item.path) 
                ? 'text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : ''}`} />
            <span className="mt-1 text-[10px]">{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};


export default Sidebar;
