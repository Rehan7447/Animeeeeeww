import supabase from "./supabase";
import { Anime } from "@/types";

export type AnimeListStatus = "watching" | "finished" | "dropped" | "planned";

export async function addOrUpdateAnimeListEntry(userId: string, anime: Anime, status: AnimeListStatus) {
  return supabase.from("user_anime_list").upsert([
    {
      user_id: userId,
      anime_id: anime.id,
      anime_data: anime,
      status,
      updated_at: new Date().toISOString(),
    },
  ], { onConflict: "user_id,anime_id" });
}

export async function removeAnimeListEntry(userId: string, animeId: string) {
  return supabase.from("user_anime_list").delete().eq("user_id", userId).eq("anime_id", animeId);
}

export async function getUserAnimeList(userId: string, status?: AnimeListStatus) {
  let query = supabase.from("user_anime_list").select("anime_data, status, anime_id, created_at, updated_at").eq("user_id", userId);
  if (status) query = query.eq("status", status);
  return query.order("updated_at", { ascending: false });
}
