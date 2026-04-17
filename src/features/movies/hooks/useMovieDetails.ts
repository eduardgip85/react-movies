import { useEffect, useState } from "react";
import { getMovieById, getMovieCredits, getWatchProviders } from "../services/movies.service";
import type { Movie } from "../types/movie";
import type { CastMember } from "../types/cast";

export function useMovieDetail(id: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    async function loadMovieDetail() {
      try {
        const [movieData, creditsData, providersData] = await Promise.all([
          getMovieById(id),
          getMovieCredits(id),
          getWatchProviders(id),
        ]);
        setProviders(providersData);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError("Error carregant la pel·lícula");
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetail();
  }, [id]);

  return {
    movie,
    cast,
    loading,
    error,
    providers
  };
}