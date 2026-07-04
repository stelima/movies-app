import MovieList from '../components/MovieList/MovieList';
import Header from '../components/Header/Header';
import { getLatestMovies } from '@/services/movie.service';

export default async function Home() {
  const movies = await getLatestMovies();

  return (
    <main>
     <Header />
     <MovieList movies={movies} />
    </main>
  );
}
