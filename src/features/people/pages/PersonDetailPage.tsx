import { Link, useParams } from "react-router-dom";
import { usePersonDetail } from "../hooks/usePersonDetails";

export default function PersonDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <p>Person ID not found</p>;
  }

  const { person, movies, loading, error } = usePersonDetail(id);

  if (loading) return <p>Loading person...</p>;
  if (error) return <p>{error}</p>;
  if (!person) return <p>No person found</p>;

  return (
    <main className="">
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={person.name}
          className="w-full rounded"
        />

        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
            Actor details
          </p>

          <h1 className="mb-3 text-4xl font-bold">{person.name}</h1>

          <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-400">
            <span>{person.known_for_department}</span>
            {person.birthday && <span>{person.birthday}</span>}
            {person.place_of_birth && <span>{person.place_of_birth}</span>}
          </div>

          <p className="max-w-3xl text-sm leading-7 text-gray-300">
            {person.biography || "No biography available."}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Movies</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="rounded-lg bg-white/5 p-3 transition hover:bg-white/10"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="mb-3 h-56 w-full rounded object-cover"
              />

              <h3 className="text-sm font-semibold">{movie.title}</h3>
              <p className="text-xs text-gray-400">{movie.release_date}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}