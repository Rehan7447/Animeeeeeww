"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AnimeListButton from "./AnimeListButton";
import { Anime } from "@/types";

type AnimeCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  subtype?: string;
  rating?: string;
  englishTitle?: string;
  showActions?: boolean;
};

const AnimeCard = ({
  id,
  title,
  imageUrl,
  subtype,
  rating,
  englishTitle,
  showActions = true,
}: AnimeCardProps) => {
  return (
    <div className="group relative bg-card rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {subtype && (
          <span className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-0.5 rounded text-xs font-medium">
            {subtype.toUpperCase()}
          </span>
        )}

        {rating && (
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded flex items-center text-xs">
            <span className="text-yellow-400 mr-1">★</span> {rating}
          </div>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <Link href={`/anime/${id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {englishTitle && englishTitle !== title && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {englishTitle}
          </p>
        )}

        {showActions && (
          <div className="mt-auto pt-3 flex justify-between items-center">
            <FavoriteButton animeId={id} size="sm" />
            <AnimeListButton animeId={id} size="sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;
