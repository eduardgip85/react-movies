import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>No user found.</p>;
  }

  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : "U";
  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "N/A";

  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.20),transparent_30%)]" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-3xl font-bold text-white shadow-lg">
              {userInitial}
            </div>

            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
                Profile
              </p>
              <h1 className="text-3xl font-bold md:text-4xl">Welcome back</h1>
              <p className="mt-2 text-sm text-gray-300">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/favorites"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Favorites
            </Link>

            <Link
              to="/movies"
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Explore Movies
            </Link>

            <Link
              to="/movies"
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Logout
            </Link>

          </div>
        </div>
      </section>

      <section className="grid gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-400">
            Account information
          </p>
          <h2 className="mb-6 text-2xl font-bold">Your details</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-black/30 p-5">
              <p className="mb-1 text-sm text-gray-400">Email</p>
              <p className="break-all text-base font-medium text-white">
                {user.email}
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 p-5">
              <p className="mb-1 text-sm text-gray-400">Status</p>
              <p className="text-base font-medium text-white">Logged in</p>
            </div>

            <div className="rounded-2xl bg-black/30 p-5">
              <p className="mb-1 text-sm text-gray-400">Member since</p>
              <p className="text-base font-medium text-white">{createdAt}</p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}