"use client";
import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import supabase from "@/lib/supabase";

import { Anime } from "@/types";

interface FavoriteButtonProps {
  animeId: string;
  animeData?: Anime;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

export default function FavoriteButton({
  animeId,
  animeData,
  size = "md",
  variant = "default"
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
    e.stopPropagation();
    
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

  // Size classes
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  // Variant classes
  const variantClasses = {
    default: "",
    outline: "border rounded-full p-1",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full"
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading || !userId}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`${sizeClasses[size]} ${variantClasses[variant]} transition-all duration-300 ${
        isFavorite 
          ? "text-red-500 hover:text-red-600" 
          : "text-gray-400 hover:text-red-400"
      }`}
    >
      {isFavorite ? <AiFillHeart className="fill-current" /> : <AiOutlineHeart />}
    </button>
  );
}
