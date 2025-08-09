"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/types";
import supabase from "@/lib/supabase";
import { getFavorites } from "@/lib/favorites";
// removed unused AnimeCard import
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();
  // Removed unused user state
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserAndFavorites() {
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();
      if (session && session.user) {
        // setUser({ id: session.user.id, email: session.user.email ?? "" });
        const { data, error } = await getFavorites(session.user.id);
        if (error) setError("Failed to fetch favorites");
        else
          setFavorites(
            (data || []).map((fav: { anime_data: Anime }) => fav.anime_data)
          );
      } else {
        router.replace("/auth");
      }
      setLoading(false);
    }
    fetchUserAndFavorites();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">My Favorites</h2>
      {favorites.length === 0 ? (
        <div>No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((anime) => (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className="block group h-full"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform group-hover:scale-105">
                {anime.attributes.posterImage?.medium && (
                  <Image
                    src={anime.attributes.posterImage.medium}
                    alt={anime.attributes.canonicalTitle}
                    width={225}
                    height={318}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                  />
                )}
                <div className="p-3 flex-1 flex flex-col">
                  <div className="font-semibold text-lg mb-1 line-clamp-2">
                    {anime.attributes.canonicalTitle}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                    {anime.attributes.titles.en && (
                      <span>({anime.attributes.titles.en}) </span>
                    )}
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded ml-1">
                      {anime.attributes.subtype?.toUpperCase()}
                    </span>
                  </div>
                  <span className="mt-auto text-blue-600 dark:text-blue-400 text-xs group-hover:underline">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
