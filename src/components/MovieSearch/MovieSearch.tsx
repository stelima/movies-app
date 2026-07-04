'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Movie } from '@/interfaces/movie';
import { getSearchMovies } from '@/services/movie.service';
import { debounce } from '@/lib/utils';
import styles from './MovieSearch.module.css';

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) {
          setResults([]);
          setLoading(false);
          return;
        }

        setError(null);
        setLoading(true);

        try {
          const movies = await getSearchMovies(value);
          setResults(movies.slice(0, 10));
        } catch {
          setError('Erro ao buscar filmes');
        } finally {
          setLoading(false);
        }
      }, 400),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className={styles.container}>
      <input
        id="movie-search"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar filme.."
        className={styles.input}
      />

      {loading && <p className={styles.message}>Carregando...</p>}
      {error && <p className={styles.message}>{error}</p>}

      <div className={styles.results}>
        {results.length > 0 && (
          <div>
            {results.map((movie) => (
              <div key={movie.id} className={styles.resultItem}>
                <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
