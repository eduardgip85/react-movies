import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="space-y-12">
      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center px-6 py-16 md:px-10 md:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.38),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.25),transparent_30%)]" />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-red-400">
            Movies Platform
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
            Discover movies, explore actors and save your favorites
          </h1>

          <p className="mb-8 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
            Browse popular movies, search by filters, check detailed information
            about each title and actor, and build your own personal list of
            favorites.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/movies"
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Explore Movies
            </Link>

            {!user ? (
              <Link
                to="/login"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/favorites"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Favorites
              </Link>
            )}
          </div>
          
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
            Explore
          </p>
          <h2 className="mb-3 text-2xl font-semibold">Find movies easily</h2>
          <p className="text-sm leading-7 text-gray-300">
            Search and filter movies by genre, year, rating, language and more.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
            Discover
          </p>
          <h2 className="mb-3 text-2xl font-semibold">Check full details</h2>
          <p className="text-sm leading-7 text-gray-300">
            View detailed movie pages with overview, cast, runtime, genres and
            actor information.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
            Save
          </p>
          <h2 className="mb-3 text-2xl font-semibold">Build your favorites</h2>
          <p className="text-sm leading-7 text-gray-300">
            Save your favorite movies and rate them with your own personal score.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 relative">
      
        <div className="rounded-3xl absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.28),transparent_40%)]" />
        <div className="rounded-3xl absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.15),transparent_30%)]" />

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
              Why use this app
            </p>
            <h2 className="text-3xl font-bold">A simple movie experience</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-black/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">Clean navigation</h3>
            <p className="text-sm leading-7 text-gray-300">
              Move from movie lists to detailed pages and actor profiles with a
              simple and intuitive flow.
            </p>
          </div>

          <div className="rounded-2xl bg-black/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">Personalized experience</h3>
            <p className="text-sm leading-7 text-gray-300">
              Log in to save favorites, rate your movies and build your own
              collection.
            </p>
          </div>

          <div className="rounded-2xl bg-black/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">Movie details</h3>
            <p className="text-sm leading-7 text-gray-300">
              Access information like rating, release date, runtime, genres and
              cast in one place.
            </p>
          </div>

          <div className="rounded-2xl bg-black/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">Actor pages</h3>
            <p className="text-sm leading-7 text-gray-300">
              Explore actor details and see other movies they appear in.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}