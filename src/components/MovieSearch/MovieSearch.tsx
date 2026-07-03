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
    <div>
      <label htmlFor="movie-search" style={{ color: '#fff' }}>
        Buscar filme: 
      </label>
      <input
        id="movie-search"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Digite o título do filme"
        style={{ height: '40px' }}
      />

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <div className={styles.results}>
        {results.length > 0 && (
          <div>
            {results.map((movie) => (
              <div key={movie.id} style={{ padding: '10px' }}>
                <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
