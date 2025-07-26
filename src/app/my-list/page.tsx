"use client";
import React, { useEffect, useState } from "react";
import {
  getUserAnimeList,
  removeAnimeListEntry,
  AnimeListStatus,
} from "@/lib/userAnimeList";
import { Anime } from "@/types";
import supabase from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statusOptions: (AnimeListStatus | "all")[] = [
  "all",
  "watching",
  "finished",
  "dropped",
  "planned",
];

export default function MyAnimeListPage() {
  const [list, setList] = useState<
    { anime_data: Anime; status: AnimeListStatus; anime_id: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<AnimeListStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      setError(null);
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();
      if (!session?.user?.id) {
        router.replace("/auth");
        return;
      }
      const { data, error } = await getUserAnimeList(
        session.user.id,
        status === "all" ? undefined : status
      );
      if (error) setError("Failed to fetch list");
      else setList(data || []);
      setLoading(false);
    }
    fetchList();
  }, [status, router]);

  const handleRemove = async (animeId: string) => {
    setLoading(true);
    const { data: { session } = { session: null } } =
      await supabase.auth.getSession();
    if (!session?.user?.id) {
      router.replace("/auth");
      return;
    }
    await removeAnimeListEntry(session.user.id, animeId);
    setList((prev) => prev.filter((a) => a.anime_id !== animeId));
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">My Anime List</h1>
      <div className="mb-4">
        <select
          className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          value={status}
          onChange={(e) => setStatus(e.target.value as AnimeListStatus | "all")}
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "all"
                ? "All"
                : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : list.length === 0 ? (
        <div>No anime in your list.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {list.map(({ anime_data, status, anime_id }) => (
            <Link
              key={anime_id}
              href={`/anime/${anime_id}`}
              className="relative group h-full bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 transition-transform"
            >
              {anime_data.attributes.posterImage?.medium && (
                <Image
                  src={anime_data.attributes.posterImage.medium}
                  alt={anime_data.attributes.canonicalTitle}
                  width={225}
                  height={318}
                  className="w-full h-36 sm:h-44 md:h-48 object-cover"
                />
              )}
              <div className="p-2 sm:p-3 flex-1 flex flex-col">
                <div className="font-semibold text-lg mb-1 line-clamp-2">
                  {anime_data.attributes.canonicalTitle}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                  <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
                <button
                  className="mt-auto text-xs text-red-500 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(anime_id);
                  }}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
