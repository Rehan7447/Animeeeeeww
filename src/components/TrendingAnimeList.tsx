"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import { fetchTrendingAnime } from "../lib/kitsu";
import { Anime } from "../types";

const TrendingAnimeList = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-primary rounded-full"></div>
          <span className="mt-2 text-sm text-muted-foreground">
            Loading anime...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-accent/10 rounded-lg border border-accent text-center">
        <p className="text-accent-foreground">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-accent/20 rounded-md text-accent-foreground text-sm hover:bg-accent/30 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Filter functionality
  const filteredAnime = filter
    ? anime.filter((a) => a.attributes.subtype === filter)
    : anime;

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            filter === null
              ? "bg-primary text-primary-foreground"
              : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        {["TV", "movie", "OVA", "special"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              filter === type
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-slide-up">
        {filteredAnime.map((a) => (
          <AnimeCard
            key={a.id}
            id={a.id}
            title={a.attributes.canonicalTitle}
            imageUrl={a.attributes.posterImage?.medium || "/placeholder.jpg"}
            subtype={a.attributes.subtype || ""}
            englishTitle={a.attributes.titles.en}
            rating={
              a.attributes.averageRating
                ? (parseInt(a.attributes.averageRating as string) / 10).toFixed(
                    1
                  )
                : ""
            }
            showActions={true}
          />
        ))}
      </div>

      {filteredAnime.length === 0 && (
        <div className="w-full py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No anime found for the selected filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrendingAnimeList;
