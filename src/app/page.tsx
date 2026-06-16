import MovieList from './components/MovieList/MovieList';
import { getLatestMovies } from '@/lib/tmdb';

export default async function Home() {
  const movies = await getLatestMovies();

  return <MovieList movies={movies} />;
}
