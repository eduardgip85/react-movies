import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { useAuth } from "../../auth/hooks/useAuth";
import { useFavorites } from "../../favorites/hooks/useFavorites";

export function useMovieFavorite(movie: Movie | null) {
  const { user } = useAuth();
  const {
    toggleFavorite,
    checkIsFavorite,
    getFavoriteByMovieId,
    changeFavoriteRating,
  } = useFavorites();

  const isFavorite = movie ? checkIsFavorite(movie.id) : false;
  const currentFavorite = movie ? getFavoriteByMovieId(movie.id) : null;

  const [personalRating, setPersonalRating] = useState<number | null>(null);

  useEffect(() => {
    if (currentFavorite) {
      setPersonalRating(
        currentFavorite.personal_rating !== null
          ? Number(currentFavorite.personal_rating)
          : null
      );
    } else {
      setPersonalRating(null);
    }
  }, [currentFavorite]);

  async function handleFavoriteClick() {
    if (!movie || !user) return;

    try {
      await toggleFavorite({
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster_path ?? null,
        movieRating: movie.vote_average ?? null,
        personalRating,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }

  async function handleRatingChange(rating: number) {
    setPersonalRating(rating);

    if (!movie || !user) return;

    if (checkIsFavorite(movie.id)) {
      await changeFavoriteRating(movie.id, rating);
    }
  }

  return {
    user,
    isFavorite,
    personalRating,
    handleFavoriteClick,
    handleRatingChange,
  };
}