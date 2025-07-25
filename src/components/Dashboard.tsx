// Example: Dashboard component
import React, { useEffect, useState } from "react";
import { Anime } from "../types";
import supabase from "../lib/supabase";
import { getFavorites } from "../lib/favorites";
import AnimeCard from "./AnimeCard";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserAndFavorites() {
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();
      if (session && session.user) {
        setUser(session.user);
        const { data, error } = await getFavorites(session.user.id);
        if (error) setError("Failed to fetch favorites");
        else setFavorites((data || []).map((fav: any) => fav.anime_data));
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
            <AnimeCard
              key={anime.id}
              title={anime.title}
              imageUrl={anime.posterImage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
