"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAnimeDetails } from "@/lib/kitsu";
import Image from "next/image";
import { Anime } from "@/types";

export default function AnimeDetailsClient() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchAnimeDetails(id)
      .then((data) => setAnime(data.data as Anime))
      .catch(() => setError("Failed to fetch anime details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!anime) return <div>Anime not found.</div>;

  // Defensive: type guard for attributes
  if (!anime.attributes) return <div>Invalid anime data.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {anime.attributes.canonicalTitle}
      </h1>
      {anime.attributes.posterImage?.medium && (
        <Image
          src={anime.attributes.posterImage.medium}
          alt={anime.attributes.canonicalTitle}
          width={225}
          height={318}
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}
      <div className="mb-2">{anime.attributes.synopsis}</div>
    </div>
  );
}
