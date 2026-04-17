import { Link } from "react-router-dom";
import type { CastMember } from "../types/cast";

type CastListProps = {
  cast: CastMember[];
};

export default function CastList({ cast }: CastListProps) {
  if (cast.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Cast</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {cast.map((actor) => (
          <Link
            to={`/person/${actor.id}`}
            key={actor.id}
            className="rounded-lg bg-white/5 p-3 transition hover:bg-white/10"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={actor.name}
              className="mb-3 h-48 w-full rounded object-cover"
            />

            <h3 className="text-sm font-semibold">{actor.name}</h3>
            <p className="text-xs text-gray-400">{actor.character}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}