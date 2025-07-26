"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import GenreFilter from "@/components/GenreFilter";

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

export default function SearchClient() {
  // Types for Kitsu API response
  type KitsuAnime = {
    id: string;
    type: string;
    links: {
      self: string;
    };
    attributes: {
      slug: string;
      titles: Record<string, string>;
      canonicalTitle: string;
      posterImage?: {
        tiny?: string;
        large?: string;
        small?: string;
        medium?: string;
        original?: string;
        meta?: any;
      };
      subtype: string;
    };
  };

  type KitsuSearchResponse = {
    data: KitsuAnime[];
    meta: {
      count: number;
    };
    links: {
      first?: string;
      next?: string;
      last?: string;
      prev?: string;
    };
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<KitsuAnime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0); // offset
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [pageSize] = useState(10);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [pendingGenres, setPendingGenres] = useState<string[]>([]);
  const [pendingQuery, setPendingQuery] = useState("");
  const [genresLoading, setGenresLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(
          "https://kitsu.io/api/edge/genres?page[limit]=50"
        );
        const data = await res.json();
        setGenres(data.data.map((g: any) => g.attributes.name));
      } finally {
        setGenresLoading(false);
      }
    }
    fetchGenres();
  }, []);

  // Keep pending state in sync with actual state on mount
  useEffect(() => {
    setPendingGenres(selectedGenres);
    setPendingQuery(query);
    // eslint-disable-next-line
  }, []);

  async function fetchPage(
    pageOffset: number,
    q: string = query,
    cats: string[] = selectedGenres
  ) {
    setLoading(true);
    setError(null);
    try {
      const categoriesParam =
        cats.length > 0
          ? `&categories=${encodeURIComponent(cats.join(","))}`
          : "";
      const res = await fetch(
        `/api/kitsu/search?query=${encodeURIComponent(
          q
        )}${categoriesParam}&offset=${pageOffset}&limit=${pageSize}`
      );
      const data: KitsuSearchResponse = await res.json();
      setResults(data.data || []);
      setTotal(data.meta?.count || 0);
      setHasNext(!!data.links?.next);
      setHasPrev(!!data.links?.prev || pageOffset > 0);
    } catch {
      setError("Failed to search anime");
    }
    setLoading(false);
  }

  function handleSearch() {
    setQuery(pendingQuery);
    setSelectedGenres(pendingGenres);
    setPage(0);
    fetchPage(0, pendingQuery, pendingGenres);
  }

  function handleGenreChange(genres: string[]) {
    setPendingGenres(genres);
  }

  function handleQueryChange(q: string) {
    setPendingQuery(q);
  }

  function handleNext() {
    const nextPage = page + pageSize;
    setPage(nextPage);
    fetchPage(nextPage, query, selectedGenres);
  }

  function handlePrev() {
    const prevPage = Math.max(0, page - pageSize);
    setPage(prevPage);
    fetchPage(prevPage, query, selectedGenres);
  }

  return (
    <div>
      <SearchBar
        value={pendingQuery}
        onChange={handleQueryChange}
        onSubmit={handleSearch}
      />
      <div className="mt-4">
        {/* Selected genres as chips */}
        {pendingGenres.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {pendingGenres.map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {genre}
                <button
                  type="button"
                  className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                  aria-label={`Remove ${genre}`}
                  onClick={() =>
                    handleGenreChange(pendingGenres.filter((g) => g !== genre))
                  }
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
        {genresLoading ? (
          <div>Loading genres...</div>
        ) : (
          <GenreFilter
            genres={genres}
            selected={pendingGenres}
            onChange={handleGenreChange}
          />
        )}
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {results.length > 0 && (
          <>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((anime) => (
                <li key={anime.id}>
                  <Link
                    href={`/anime/${anime.id}`}
                    className="block group h-full"
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform group-hover:scale-105">
                      {anime.attributes.posterImage?.medium && (
                        <Image
                          src={anime.attributes.posterImage.medium}
                          alt={anime.attributes.canonicalTitle}
                          width={225}
                          height={318}
                          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                        />
                      )}
                      <div className="p-3 flex-1 flex flex-col">
                        <div className="font-semibold text-lg mb-1 line-clamp-2">
                          {anime.attributes.canonicalTitle}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                          {anime.attributes.titles.en && (
                            <span>({anime.attributes.titles.en}) </span>
                          )}
                          <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded ml-1">
                            {anime.attributes.subtype?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-blue-600 dark:text-blue-400 text-xs group-hover:underline">
                            View Details
                          </span>
                          <FavoriteButton
                            animeId={anime.id}
                            animeData={anime}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                disabled={page === 0 || loading || !hasPrev}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {Math.floor(page / pageSize) + 1} of{" "}
                {Math.ceil(total / pageSize) || 1}
              </span>
              <button
                onClick={handleNext}
                disabled={loading || !hasNext}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
        {!loading && !error && results.length === 0 && (
          <div className="text-gray-500">No results found.</div>
        )}
      </div>
    </div>
  );
}
