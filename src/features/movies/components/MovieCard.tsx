import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import FavoriteIconBtn from "../../favorites/components/FavoriteIconBtn";
import { useFavorites } from "../../favorites/hooks/useFavorites";
import { useAuth } from "../../auth/hooks/useAuth";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { user } = useAuth();
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  const isFavorite = checkIsFavorite(movie.id);

  async function handleToggleFavorite() {
    if (!user) return;

    try {
      await toggleFavorite({
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster_path ?? null,
        movieRating: movie.vote_average ?? null,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
    >
      <div className="relative overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="h-[320px] w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {user && (
          <div className="absolute right-3 top-3 z-10">
            <FavoriteIconBtn
              isFavorite={isFavorite}
              onClick={handleToggleFavorite}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="line-clamp-1 text-sm font-semibold">{movie.title}</h2>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>{releaseYear}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}