// Example: Search page (pages/search/index.tsx)
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { searchKitsuAnime } from "../../lib/algolia";
import Layout from "../../components/Layout";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    try {
      const data = await searchKitsuAnime({ text: query, limit: 12 });
      setResults(data.data || []);
    } catch (err) {
      setError("Failed to search anime");
    }
    setLoading(false);
  }

  return (
    <Layout>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search Anime</h1>
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
        <div className="mt-4">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {results.length > 0 && (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((anime: any) => (
                <li
                  key={anime.id}
                  className="bg-gray-100 dark:bg-gray-800 rounded p-2"
                >
                  <div className="font-semibold">{anime.attributes.canonicalTitle}</div>
                  <img
                    src={anime.attributes.posterImage?.medium}
                    alt={anime.attributes.canonicalTitle}
                    className="w-full h-40 object-cover rounded"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </Layout>
  );
}
