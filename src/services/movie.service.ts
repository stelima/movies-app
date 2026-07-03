import { get } from '@/lib/api';
import type { Movie, MovieDetails } from '@/interfaces/movie';

type MovieListResponse = {
  results: Movie[];
};

export async function getLatestMovies(): Promise<Movie[]> {
  const data = await get<MovieListResponse>('/movie/now_playing', {
    language: 'pt-BR',
    page: 1,
  });

  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    return await get<MovieDetails>(`/movie/${id}`, {
      language: 'pt-BR',
    });
  } catch {
    return null;
  }
}

export async function getSearchMovies(query: string): Promise<Movie[]> {
  const data = await get<MovieListResponse>('/search/movie', {
    language: 'pt-BR',
    query,
    page: 1,
    include_adult: false,
  });

  return data.results;
}
