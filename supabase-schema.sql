-- User Anime List Table
create table if not exists user_anime_list (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  anime_id text not null,
  anime_data jsonb not null,
  status text not null check (status in ('watching', 'finished', 'dropped', 'planned')),
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create index if not exists idx_user_anime_list_user_id on user_anime_list(user_id);
create index if not exists idx_user_anime_list_anime_id on user_anime_list(anime_id);
create unique index if not exists uniq_user_anime_list_user_anime on user_anime_list(user_id, anime_id);


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