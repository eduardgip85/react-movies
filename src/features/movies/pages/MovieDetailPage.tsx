import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetails";
import { useMovieFavorite } from "../hooks/useMoviesFavorite";
import CastList from "../components/CastList";
import FavoriteButton from "../../favorites/components/FavoriteBtn";
import StarRating from "../../favorites/components/StarRating";

export default function MovieDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <p>Movie ID not found</p>;
  }

  const { movie, cast, loading, error } = useMovieDetail(id);
  const {
    user,
    isFavorite,
    personalRating,
    handleFavoriteClick,
    handleRatingChange,
  } = useMovieFavorite(movie);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found</p>;

  return (
    <div>
      <div className="mt-14 grid gap-6 md:grid-cols-[280px_1fr]">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />

        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
            Movie details
          </p>

          <h1 className="mb-3 text-4xl font-bold">{movie.title}</h1>

          <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-400">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            {movie.release_date && <span>{movie.release_date}</span>}
            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="max-w-3xl text-sm leading-7 text-gray-300">
            {movie.overview}
          </p>

          {user && (
            <div className="mt-6 flex flex-col gap-4">
              <div>
                <p className="mb-2 text-sm text-gray-400">Your rating</p>

                <StarRating
                  value={personalRating}
                  onChange={handleRatingChange}
                />

                <p className="mt-2 text-xs text-gray-400">
                  {personalRating ? `${personalRating}/5` : "No rating"}
                </p>
              </div>

              <div className="mt-4">
                <FavoriteButton
                  isFavorite={isFavorite}
                  onClick={handleFavoriteClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <CastList cast={cast} />
    </div>
  );
}