import type { Movie } from "../../movies/types/movie";

export type PersonMovieCredit = Pick<Movie, "id" | "title" | "poster_path" | "release_date">;

export type Person = {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
};

export type PersonMovieCreditsResponse = {
  cast: PersonMovieCredit[];
};