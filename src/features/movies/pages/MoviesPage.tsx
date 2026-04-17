import { useMovies } from "../hooks/useMovies";
import MovieFilters from "../components/MovieFilters";
import MovieCard from "../components/MovieCard";

export default function MoviesPage() {
  const {
    movies,
    genres,
    filters,
    loading,
    error,
    updateFilter,
    resetFilters,
  } = useMovies();

  return (
    <main>
      <section className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900 to-black p-6">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
          Explore
        </p>
        <h1 className="mb-2 text-4xl font-bold">Discover movies</h1>
        <p className="max-w-2xl text-sm text-gray-400">
          Search and filter movies by genre, rating, year, language and popularity.
        </p>
      </section>

      <MovieFilters
        filters={filters}
        genres={genres}
        onChange={updateFilter}
        onReset={resetFilters}
      />

      {loading && <p>Loading movies...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
          No movies found with the current filters.
        </p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}