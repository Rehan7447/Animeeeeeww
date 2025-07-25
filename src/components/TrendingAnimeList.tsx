// Example: TrendingAnimeList component
import React, { useEffect, useState } from 'react';
import AnimeCard from './AnimeCard';
import { fetchTrendingAnime } from '../lib/kitsu';
import { Anime } from '../types';

const TrendingAnimeList = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrendingAnime()
      .then(data => {
        setAnime(data.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.titles.en_jp || item.attributes.titles.en || item.attributes.titles.ja_jp,
          posterImage: item.attributes.posterImage?.medium || '',
          synopsis: item.attributes.synopsis,
          genres: item.attributes.genres || [],
        })));
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load trending anime');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {anime.map(a => (
        <AnimeCard key={a.id} title={a.title} imageUrl={a.posterImage} />
      ))}
    </div>
  );
};

export default TrendingAnimeList;
