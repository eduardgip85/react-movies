import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={handleCloseMenu}
        />
      )}

      <nav className="relative mx-auto max-w-7xl px-4 py-4">
        <div className="relative z-50 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-red-500">
            MOVIESDB
          </Link>

          <div className="hidden items-center gap-4 text-sm md:flex">
            <Link to="/" className="transition hover:text-red-400">
              Home
            </Link>

            <Link to="/movies" className="transition hover:text-red-400">
              Movies
            </Link>

            {!loading && !user && (
              <Link to="/login" className="transition hover:text-red-400">
                Login
              </Link>
            )}

            {!loading && user && (
              <>
                <Link
                  to="/favorites"
                  className="transition hover:text-red-400"
                >
                  Favorites
                </Link>

                <Link to="/profile" className="transition hover:text-red-400">
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:bg-white/20 md:hidden"
            aria-label="Open menu"
          >
            <span className="text-xl">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-full z-50 mt-3 md:hidden">
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-zinc-950/95 p-3 text-sm text-white shadow-2xl backdrop-blur-md">
              <Link
                to="/"
                onClick={handleCloseMenu}
                className="rounded-lg px-3 py-2 transition hover:bg-white/10"
              >
                Home
              </Link>

              <Link
                to="/movies"
                onClick={handleCloseMenu}
                className="rounded-lg px-3 py-2 transition hover:bg-white/10"
              >
                Movies
              </Link>

              {!loading && !user && (
                <Link
                  to="/login"
                  onClick={handleCloseMenu}
                  className="rounded-lg px-3 py-2 transition hover:bg-white/10"
                >
                  Login
                </Link>
              )}

              {!loading && user && (
                <>
                  <Link
                    to="/favorites"
                    onClick={handleCloseMenu}
                    className="rounded-lg px-3 py-2 transition hover:bg-white/10"
                  >
                    Favorites
                  </Link>

                  <Link
                    to="/profile"
                    onClick={handleCloseMenu}
                    className="rounded-lg px-3 py-2 transition hover:bg-white/10"
                  >
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-left text-white transition hover:bg-red-500"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}