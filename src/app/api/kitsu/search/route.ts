import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  console.log("Search Params:", searchParams.toString());

  const text = searchParams.get("query") ?? "";
  const categories = searchParams.get("categories") ?? "";
  const limit = searchParams.get("limit") ?? "10";
  const offset = searchParams.get("offset") ?? "0";
  const sort = searchParams.get("sort") ?? "-userCount";
  const fields =
    searchParams.get("fields") ??
    "id,slug,titles,canonicalTitle,posterImage,subtype";
  const include = searchParams.get("include") ?? "";

  const KITSU_BASE_URL =
    process.env.NEXT_PUBLIC_KITSU_BASE_URL || "https://kitsu.io/api/edge/";

  // Build URL with URLSearchParams to ensure proper encoding
  const params = new URLSearchParams();

  if (text) params.append("filter[text]", text);
  if (categories) params.append("filter[categories]", categories);
  if (sort) params.append("sort", sort);
  if (fields) params.append("fields[anime]", fields);
  if (include) params.append("include", include);

  params.append("page[limit]", limit);
  params.append("page[offset]", offset);

  const url = `${KITSU_BASE_URL}anime?${params.toString()}`;

  console.log("Fetching from Kitsu URL:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Kitsu search failed: ${response.status} - ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch from Kitsu", details: (err as Error).message },
      { status: 500 }
    );
  }
}
