// Example: Anime details page (pages/anime/[id].tsx)
import React from 'react';
import Layout from '../../components/Layout';

export default function AnimeDetailsPage() {
  // TODO: Fetch anime details using the id param
  return (
    <Layout>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Anime Details</h1>
        <div>Anime details will be shown here.</div>
      </main>
    </Layout>
  );
}
