"use client";
import React, { useEffect, useState } from "react";
import { Anime } from "@/types";
import supabase from "@/lib/supabase";
import { getFavorites } from "@/lib/favorites";
import AnimeCard from "@/components/AnimeCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";

export default function FavoritesClient() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFavorites() {
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();
      if (session && session.user) {
        const { data, error } = await getFavorites(session.user.id);
        if (error) setError("Failed to fetch favorites");
        else setFavorites((data || []).map((fav: any) => fav.anime_data));
      } else {
        router.replace("/auth");
      }
      setLoading(false);
    }
    fetchFavorites();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length === 0 ? (
        <div>No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((anime) => (
            <div key={anime.id} className="relative group h-full">
              <Link href={`/anime/${anime.id}`} className="block h-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform group-hover:scale-105">
                  {anime.attributes.posterImage?.medium && (
                    <img
                      src={anime.attributes.posterImage.medium}
                      alt={anime.attributes.canonicalTitle}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                      width={225}
                      height={318}
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
              <button
                className="absolute top-2 right-2 text-xl text-red-500 bg-white dark:bg-gray-900 rounded-full shadow p-1 opacity-80 hover:opacity-100 z-10"
                title="Remove from favorites"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLoading(true);
                  const { data: { session } = { session: null } } =
                    await supabase.auth.getSession();
                  if (!session?.user?.id) return;
                  await supabase
                    .from("favorites")
                    .delete()
                    .eq("user_id", session.user.id)
                    .eq("anime_id", anime.id);
                  setFavorites((prev) => prev.filter((a) => a.id !== anime.id));
                  setLoading(false);
                }}
                disabled={loading}
                aria-label="Remove from favorites"
              >
                <AiFillHeart />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
