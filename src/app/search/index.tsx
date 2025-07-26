import dynamic from "next/dynamic";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Anime</h1>
      <SearchClient />
    </main>
  );
}
