// Place your global TypeScript types here.

export interface Anime {
  id: string;
  title: string;
  posterImage: string;
  synopsis?: string;
  genres?: string[];
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  favorites: Anime[];
}

export {};
