// Example: Supabase API helper for favorites
import supabase from './supabase';
import { Anime } from '../types';

export async function addFavorite(userId: string, anime: Anime) {
  return supabase.from('favorites').insert({
    user_id: userId,
    anime_id: anime.id,
    anime_data: anime,
  });
}

export async function getFavorites(userId: string) {
  return supabase.from('favorites').select('*').eq('user_id', userId);
}
