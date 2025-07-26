import supabase from "./supabase";
import { Anime } from "../types";

// Add a favorite anime for a user
export async function addFavorite(userId: string, anime: Anime) {
  return supabase.from("favorites").insert({
    user_id: userId,
    anime_id: anime.id,
    anime_data: anime,
  });
}

// Get all favorite anime for a user
export async function getFavorites(userId: string) {
  return supabase.from("favorites").select("*").eq("user_id", userId);
}
