// Example: Kitsu API helper
export async function fetchTrendingAnime() {
  const res = await fetch('https://kitsu.app/api/edge/anime?sort=-userCount&page[limit]=20');
  if (!res.ok) throw new Error('Failed to fetch trending anime');
  return res.json();
}

export async function fetchAnimeDetails(animeId: string) {
  const res = await fetch(`https://kitsu.app/api/edge/anime/${animeId}`);
  if (!res.ok) throw new Error('Failed to fetch anime details');
  return res.json();
}
