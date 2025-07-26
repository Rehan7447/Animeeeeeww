"use client";
// Example: TrendingAnimeList component
import React, { useEffect, useState } from "react";
import Image from "next/image";
// removed unused AnimeCard import
import { fetchTrendingAnime } from "../lib/kitsu";
import { Anime } from "../types";

const TrendingAnimeList = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrendingAnime()
      .then((data) => {
        setAnime(data.data.map((item: Anime) => item));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load trending anime");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {anime.map((a) => (
        <a key={a.id} href={`/anime/${a.id}`} className="block group h-full">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform group-hover:scale-105">
            {a.attributes.posterImage?.medium && (
              <Image
                src={a.attributes.posterImage.medium}
                alt={a.attributes.canonicalTitle}
                width={225}
                height={318}
                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
              />
            )}
            <div className="p-3 flex-1 flex flex-col">
              <div className="font-semibold text-lg mb-1 line-clamp-2">
                {a.attributes.canonicalTitle}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                {a.attributes.titles.en && (
                  <span>({a.attributes.titles.en}) </span>
                )}
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded ml-1">
                  {a.attributes.subtype?.toUpperCase()}
                </span>
              </div>
              <span className="mt-auto text-blue-600 dark:text-blue-400 text-xs group-hover:underline">
                View Details
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default TrendingAnimeList;
