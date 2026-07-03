import MovieList from '../components/MovieList/MovieList';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import { getLatestMovies } from '@/services/movie.service';

export default async function Home() {
  const movies = await getLatestMovies();

  return (
    <main>
      <MovieSearch />
      <MovieList movies={movies} />
    </main>
  );
}
