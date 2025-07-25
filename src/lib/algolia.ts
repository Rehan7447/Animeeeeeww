// Kitsu API search helper using JSON:API spec
export async function searchKitsuAnime({
  text = "",
  categories = "",
  limit = 10,
  offset = 0,
  sort = "-userCount",
  fields = "id,slug,titles,canonicalTitle,posterImage,subtype",
  include = "",
}: {
  text?: string;
  categories?: string;
  limit?: number;
  offset?: number;
  sort?: string;
  fields?: string;
  include?: string;
}) {
  const KITSU_BASE_URL =
    process.env.NEXT_PUBLIC_KITSU_BASE_URL || "https://kitsu.io/api/edge/";
  const url = new URL(KITSU_BASE_URL + "anime");
  if (text) url.searchParams.set("filter[text]", text);
  if (categories) url.searchParams.set("filter[categories]", categories);
  if (sort) url.searchParams.set("sort", sort);
  if (fields) url.searchParams.set("fields[anime]", fields);
  if (include) url.searchParams.set("include", include);
  url.searchParams.set("page[limit]", String(limit));
  url.searchParams.set("page[offset]", String(offset));

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Kitsu search failed: ${res.status} - ${error}`);
  }
  return res.json();
}
