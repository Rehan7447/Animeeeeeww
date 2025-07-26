-- Favorites table for storing full KitsuAnime data per user
create table if not exists favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  anime_id text not null,
  anime_data jsonb not null,
  inserted_at timestamp default now(),
  unique (user_id, anime_id) -- Prevent duplicate favorites per user
);

-- Indexes for efficient lookups
create index if not exists favorites_user_id_idx on favorites(user_id);
create index if not exists favorites_anime_id_idx on favorites(anime_id);