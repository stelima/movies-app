export const API_CONFIG = {
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_API_KEY: process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY,
  CACHE_REVALIDATE: 60 * 60, // 1 hora
} as const;
