"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import AnimeListButton from "@/components/AnimeListButton";

// Type for anime detail response
interface KitsuAnimeDetail {
  id: string;
  type: string;
  links: { self: string };
  attributes: {
    slug: string;
    synopsis?: string;
    description?: string;
    canonicalTitle: string;
    titles: Record<string, string>;
    averageRating?: string;
    userCount?: number;
    favoritesCount?: number;
    startDate?: string;
    endDate?: string;
    popularityRank?: number;
    ratingRank?: number;
    ageRating?: string;
    ageRatingGuide?: string;
    subtype?: string;
    status?: string;
    posterImage?: {
      medium?: string;
      large?: string;
      original?: string;
    };
    coverImage?: {
      large?: string;
      original?: string;
    };
    episodeCount?: number;
    youtubeVideoId?: string;
  };
}

export default function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<KitsuAnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnime() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://kitsu.app/api/edge/anime/${id}`);
        if (!res.ok) throw new Error("Failed to fetch anime details");
        const data = await res.json();
        setAnime(data.data as KitsuAnimeDetail);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to fetch anime details");
      }
      setLoading(false);
    }
    if (id) fetchAnime();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!anime) return <div className="p-8 text-center">Anime not found.</div>;

  const attr = anime.attributes;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden mt-4 sm:mt-8 px-2 sm:px-4">
      {attr.coverImage?.large && (
        <div className="relative w-full h-48 sm:h-64">
          <Image
            src={attr.coverImage.large}
            alt={attr.canonicalTitle}
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}
      <div className="p-3 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6">
        {attr.posterImage?.large && (
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={attr.posterImage.large}
              alt={attr.canonicalTitle}
              width={140}
              height={200}
              className="rounded shadow-md w-28 h-40 sm:w-36 sm:h-48 object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
            {attr.canonicalTitle}
          </h1>
          <AnimeListButton anime={anime} />
          <div className="mb-2 text-gray-500 dark:text-gray-300 flex flex-wrap gap-2 items-center">
            {attr.titles.en && <span>({attr.titles.en})</span>}
            {attr.subtype && (
              <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {attr.subtype.toUpperCase()}
              </span>
            )}
            {attr.status && (
              <span className="text-xs bg-blue-200 dark:bg-blue-700 px-2 py-1 rounded">
                {attr.status}
              </span>
            )}
          </div>
          <div className="mb-4 text-sm text-gray-700 dark:text-gray-200">
            {attr.synopsis || attr.description}
          </div>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-4">
            {attr.averageRating && (
              <span className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                Rating: {attr.averageRating}
              </span>
            )}
            {attr.userCount && (
              <span className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">
                Users: {attr.userCount}
              </span>
            )}
            {attr.favoritesCount && (
              <span className="bg-pink-100 dark:bg-pink-800 px-2 py-1 rounded">
                Favorites: {attr.favoritesCount}
              </span>
            )}
            {attr.ageRating && (
              <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">
                {attr.ageRating}{" "}
                {attr.ageRatingGuide && `- ${attr.ageRatingGuide}`}
              </span>
            )}
            {attr.episodeCount && (
              <span className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">
                Episodes: {attr.episodeCount}
              </span>
            )}
          </div>
          {attr.youtubeVideoId && (
            <div className="mb-4">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${attr.youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
