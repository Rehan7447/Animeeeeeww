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
import { HiPlusCircle, HiOutlineListBullet, HiXMark } from "react-icons/hi2";

const statusOptions: AnimeListStatus[] = [
  "watching",
  "finished",
  "dropped",
  "planned",
];

const statusColors: Record<AnimeListStatus, string> = {
  watching: "bg-primary text-primary-foreground",
  finished: "bg-green-600 text-white",
  dropped: "bg-red-600 text-white",
  planned: "bg-purple-600 text-white",
};

interface AnimeListButtonProps {
  animeId: string;
  size?: "sm" | "md" | "lg";
  currentStatus?: AnimeListStatus;
  variant?: "default" | "minimal";
}

export default function AnimeListButton({
  animeId,
  size = "md",
  currentStatus,
  variant = "default",
}: AnimeListButtonProps) {
  const [status, setStatus] = useState<AnimeListStatus | undefined>(
    currentStatus
  );
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anime, setAnime] = useState<Anime | null>(null);
  const router = useRouter();

  // Fetch anime data and current status
  useEffect(() => {
    async function fetchData() {
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();

      // Fetch status
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from("user_anime_list")
          .select("status")
          .eq("user_id", session.user.id)
          .eq("anime_id", animeId)
          .single();

        if (data && data.status) setStatus(data.status as AnimeListStatus);
      }

      // Fetch anime data if needed for updates
      const { data } = await supabase
        .from("anime_cache")
        .select("*")
        .eq("id", animeId)
        .single();

      if (data) {
        setAnime(data as unknown as Anime);
      }
    }

    fetchData();
  }, [animeId]);

  const handleChange = async (newStatus: AnimeListStatus) => {
    setIsOpen(false);
    setLoading(true);

    const { data: { session } = { session: null } } =
      await supabase.auth.getSession();

    if (!session?.user?.id) {
      setLoading(false);
      router.replace("/auth");
      return;
    }

    if (anime) {
      await addOrUpdateAnimeListEntry(session.user.id, anime, newStatus);
      setStatus(newStatus);
    } else {
      // Fallback if we don't have anime data
      const { data } = await supabase
        .from("user_anime_list")
        .upsert({
          user_id: session.user.id,
          anime_id: animeId,
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (data) setStatus(newStatus);
    }

    setLoading(false);
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);

    const { data: { session } = { session: null } } =
      await supabase.auth.getSession();

    if (!session?.user?.id) {
      setLoading(false);
      router.replace("/auth");
      return;
    }

    await removeAnimeListEntry(session.user.id, animeId);
    setStatus(undefined);
    setIsOpen(false);
    setLoading(false);
  };

  // Size classes
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside() {
      if (isOpen) setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (variant === "minimal") {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            sizeClasses[size]
          } flex items-center gap-1.5 font-medium rounded-full px-3 py-1.5 transition-all ${
            status
              ? statusColors[status]
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          } shadow-sm`}
          disabled={loading}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mx-auto" />
          ) : status ? (
            <>
              <HiOutlineListBullet className="w-4 h-4" />
              <span className="hidden md:inline">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </>
          ) : (
            <>
              <HiPlusCircle className="w-4 h-4" />
              <span className="hidden md:inline">Add</span>
            </>
          )}
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1.5 right-0 bg-card text-card-foreground rounded-lg shadow-lg border border-border overflow-hidden py-1 min-w-[140px] animate-in fade-in-50 duration-100">
            {statusOptions.map((opt) => (
              <button
                key={opt}
                className={`w-full text-left px-4 py-2 hover:bg-accent/10 flex items-center gap-2 ${
                  status === opt ? "bg-accent/5 font-medium" : ""
                } ${sizeClasses[size]}`}
                onClick={() => handleChange(opt)}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    statusColors[opt].split(" ")[0]
                  }`}
                ></span>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
            {status && (
              <button
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 border-t border-border flex items-center gap-2"
                onClick={handleRemove}
              >
                <HiXMark className="w-4 h-4" /> Remove
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex items-center gap-2 mt-2 bg-card rounded-lg px-4 py-3 shadow-sm border border-border">
      <div className="relative flex-1">
        <select
          className="w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none pr-8 transition"
          value={status || ""}
          onChange={(e) => handleChange(e.target.value as AnimeListStatus)}
          disabled={loading}
        >
          <option value="">Add to List...</option>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-4 w-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {status && (
        <button
          className="text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 transition disabled:opacity-60 flex items-center gap-1.5"
          onClick={handleRemove}
          disabled={loading}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <HiXMark className="w-4 h-4" /> Remove
            </>
          )}
        </button>
      )}
    </div>
  );
}
