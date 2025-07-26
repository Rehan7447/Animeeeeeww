import dynamic from "next/dynamic";
import FavoritesClient from "./FavoritesClient";

export default function FavoritesPage() {
  return (
    <main className="container mx-auto p-4">
      <FavoritesClient />
    </main>
  );
}
