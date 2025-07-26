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
      meta?: {
        dimensions?: {
          [key: string]: {
            width: number;
            height: number;
          };
        };
      };
    };
    synopsis?: string;
    description?: string;
    subtype?: string;
    // Allow extra Kitsu attributes, but not 'any'
    [key: string]: unknown;
  };
}

export interface User {
  id: string;
  email: string;
  favorites: Anime[];
}

export {};
