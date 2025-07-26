// Place your global TypeScript types here.


// KitsuAnime type for favorites
export interface Anime {
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
    synopsis?: string;
    description?: string;
    subtype?: string;
    [key: string]: any;
  };
}

export interface User {
  id: string;
  email: string;
  favorites: Anime[];
}

export {};
