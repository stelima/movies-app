'use client';

import styles from './Header.module.css';
import MovieSearch from '../MovieSearch/MovieSearch';

export default function Header() {

  return (
    <header className={styles.header}>
       <h1 className={styles.title}>Lumière Movies</h1>
       <MovieSearch />
    </header>
  );
}
