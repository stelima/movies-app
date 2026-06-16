export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string | null;
}

const TMDB_API_KEY = process.env.TMDB_API_KEY || '843bfa63201380801f39fe959c669d28';
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 * 60 } });

  if (!res.ok) {
    throw new Error(`Falha ao buscar dados do TMDB: ${res.status}`);
  }

  return res.json();
}

export async function getLatestMovies(): Promise<Movie[]> {
  const url = `${TMDB_API_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`;
  const data = await fetchFromTMDB<{ results: Movie[] }>(url);
  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  const url = `${TMDB_API_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`;
  try {
    return await fetchFromTMDB<MovieDetails>(url);
  } catch {
    return null;
  }
}
