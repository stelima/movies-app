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
