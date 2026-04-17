import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router";

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (favorites.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold">Favorites</h1>
        <p className="rounded-lg bg-white/5 p-4 text-gray-400">
          You have no favorite movies yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Favorites</h1>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {favorites.map((favorite) => (
          <Link
            to={`/movie/${favorite.movie_id}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div
              key={favorite.id}
              className="rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <img
                src={
                  favorite.movie_poster
                    ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${favorite.movie_poster}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={favorite.movie_title}
                className="mb-3 h-[320px] w-full rounded object-cover"
              />

              <h2 className="text-sm font-semibold">{favorite.movie_title}</h2>

              {favorite.movie_rating !== null && (
                <p className="mt-1 text-xs text-gray-400">
                  Public rating: ⭐ {Number(favorite.movie_rating).toFixed(1)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}