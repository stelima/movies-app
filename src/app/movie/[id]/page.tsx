import Image from 'next/image';
import { getMovieDetails } from '@/lib/tmdb';
import styles from './page.module.css';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return <p>Filme não encontrado.</p>;
  }

//   const posterUrl = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//     : null;
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.backdropWrapper}>
          {backdropUrl ? (
            <div className={styles.backdropImageWrapper}>
              <Image
                src={backdropUrl}
                alt={`${movie.title} backdrop`}
                width={960}
                height={500}
                quality={80}
                className={styles.poster}
                priority
              />
            </div>
          ) : null}
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.meta}>
            {movie.release_date} · {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.genreList}>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={styles.genreTag}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
