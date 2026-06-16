import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieList.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Últimos lançamentos</h1>

      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.listItem}>
            <Link
              href={`/movie/${movie.id}`}
              className={styles.movieLink}
              aria-label={`Ver detalhes do filme ${movie.title}`}
            >
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  quality={90}
                  loading="lazy"
                />
              ) : (
                <p>Sem imagem</p>
              )}

              <h2 className={styles.movieTitle}>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

