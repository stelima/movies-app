function getApiKey(): string {
  const key = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  
  if (!key) {
    throw new Error(
      'TMDB_API_KEY não configurada. Configure a variável de ambiente TMDB_API_KEY ou NEXT_PUBLIC_TMDB_API_KEY'
    );
  }
  
  return key;
}

export const API_CONFIG = {
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_API_KEY: getApiKey(),
  CACHE_REVALIDATE: 300, // 5 minutos
} satisfies {
  TMDB_BASE_URL: string;
  TMDB_API_KEY: string;
  CACHE_REVALIDATE: number;
};
