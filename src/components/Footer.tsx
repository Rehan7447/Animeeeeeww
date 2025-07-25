import React from 'react';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-900 border-t mt-8">
    <div className="container mx-auto p-4 text-center text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} AnimeHub. All rights reserved.
    </div>
  </footer>
);

export default Footer;
