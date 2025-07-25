// Example: Genres page (pages/genres/index.tsx)
import React from 'react';
import GenreFilter from '../../components/GenreFilter';
import Layout from '../../components/Layout';

export default function GenresPage() {
  // TODO: Fetch genres from Kitsu API
  return (
    <Layout>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Genres</h1>
        <GenreFilter genres={['Action', 'Drama', 'Comedy']} selected={[]} onChange={() => {}} />
      </main>
    </Layout>
  );
}
