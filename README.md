# AnimeHub

A full-featured anime discovery platform built with **Next.js + TypeScript**, using **Supabase** for user authentication and database, and **Kitsu API + Algolia** for anime content.

## Features
- User signup/login (Supabase)
- Trending and recently updated anime list
- Anime search powered by Algolia
- Anime details page
- Add to favorites/watchlist
- User profile/dashboard
- Dark/light mode support

## Tech Stack
- Next.js (App Router, TypeScript)
- Supabase (Auth + DB)
- TailwindCSS
- Kitsu API (Anime data)
- Algolia (Anime search)

## Setup
1. Clone this repo and install dependencies:
   ```bash
   git clone <repo-url>
   cd anime
   npm install
   ```
2. Create a `.env.local` file in the root with your Supabase and API keys (see below).
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_KITSU_BASE_URL=https://kitsu.app/api/edge/
NEXT_PUBLIC_KITSU_ALGOLIA_KEY_URL=https://kitsu.app/api/edge/algolia-keys/media/
NEXT_PUBLIC_ALGOLIA_URL=https://AWQO5J657S-dsn.algolia.net/1/indexes/production_media/query/
NEXT_PUBLIC_ALGOLIA_APP_ID=AWQO5J657S
```

## Project Structure
- `/components` – Reusable UI components
- `/lib` – Supabase client, API helpers
- `/pages` – App routes (anime, auth, dashboard, etc.)
- `/types` – TypeScript interfaces

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server

## License
MIT
