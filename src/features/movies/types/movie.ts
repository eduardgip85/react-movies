import type { Genre } from './genre'

export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date?: string;
  overview?: string;
  runtime?: number;
  genres?: Genre[];
};