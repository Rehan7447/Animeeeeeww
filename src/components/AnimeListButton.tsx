"use client";
import React, { useState, useEffect } from "react";
import { Anime } from "@/types";
import {
  addOrUpdateAnimeListEntry,
  removeAnimeListEntry,
  AnimeListStatus,
} from "@/lib/userAnimeList";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

const statusOptions: AnimeListStatus[] = [
  "watching",
  "finished",
  "dropped",
  "planned",
];

export default function AnimeListButton({
  anime,
  currentStatus,
}: {
  anime: Anime;
  currentStatus?: AnimeListStatus;
}) {
  const [status, setStatus] = useState<AnimeListStatus | undefined>(
    currentStatus
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch current status from user's anime list on mount
  useEffect(() => {
    async function fetchStatus() {
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();
      if (!session?.user?.id) return;
      const { data, error } = await supabase
        .from("user_anime_list")
        .select("status")
        .eq("user_id", session.user.id)
        .eq("anime_id", anime.id)
        .single();
      if (data && data.status) setStatus(data.status as AnimeListStatus);
    }
    fetchStatus();
    // Only run on mount or if anime.id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anime.id]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as AnimeListStatus;
    setLoading(true);
    const { data: { session } = { session: null } } =
      await supabase.auth.getSession();
    if (!session?.user?.id) {
      setLoading(false);
      router.replace("/auth");
      return;
    }
    await addOrUpdateAnimeListEntry(session.user.id, anime, newStatus);
    setStatus(newStatus);
    setLoading(false);
  };

  const handleRemove = async () => {
    setLoading(true);
    const { data: { session } = { session: null } } =
      await supabase.auth.getSession();
    if (!session?.user?.id) {
      setLoading(false);
      router.replace("/auth");
      return;
    }
    await removeAnimeListEntry(session.user.id, anime.id);
    setStatus(undefined);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 mt-2 bg-gray-100 dark:bg-gray-800 rounded px-3 py-2 shadow border border-gray-200 dark:border-gray-700 w-fit">
      <select
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={status || ""}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="">Add to List...</option>
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
      {status && (
        <button
          className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded px-2 py-1 ml-1 transition disabled:opacity-60"
          onClick={handleRemove}
          disabled={loading}
        >
          Remove
        </button>
      )}
    </div>
  );
}
