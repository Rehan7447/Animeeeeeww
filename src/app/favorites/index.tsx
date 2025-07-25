// Example: Favorites page (pages/favorites/index.tsx)
import React from 'react';
import Layout from '../../components/Layout';

export default function FavoritesPage() {
  // TODO: Fetch and display user's favorite anime
  return (
    <Layout>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
        <div>Favorite anime will be listed here.</div>
      </main>
    </Layout>
  );
}
