const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL!;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY!;

type TmdbRequestOptions = {
  endpoint: string;
  queryParams?: Record<string, string | number>;
};

export async function tmdbRequest<T>({
  endpoint,
  queryParams = {},
}: TmdbRequestOptions): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", TMDB_API_KEY);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}