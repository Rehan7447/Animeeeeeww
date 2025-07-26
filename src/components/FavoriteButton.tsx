"use client";
import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import supabase from "@/lib/supabase";

import { Anime } from "@/types";

interface FavoriteButtonProps {
  animeId: string;
  animeData?: Anime;
}

export default function FavoriteButton({
  animeId,
  animeData,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getUserId() {
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    }
    getUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;
    async function checkFavorite() {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("anime_id", animeId)
        .single();
      setIsFavorite(!!data && !error);
    }
    checkFavorite();
  }, [animeId, userId]);

  async function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    if (!userId) {
      alert("You must be logged in to favorite an anime.");
      return;
    }
    setLoading(true);
    try {
      if (!isFavorite) {
        // Add to favorites with user_id and full anime_data
        const { error } = await supabase
          .from("favorites")
          .insert([
            {
              user_id: userId,
              anime_id: animeId,
              anime_data: animeData || null,
            },
          ]);
        if (error) throw error;
        setIsFavorite(true);
      } else {
        // Remove from favorites
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("anime_id", animeId);
        if (error) throw error;
        setIsFavorite(false);
      }
    } catch {
      alert("Failed to update favorite status");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading || !userId}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`text-xl transition-colors ${
        isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"
      }`}
    >
      {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
}
