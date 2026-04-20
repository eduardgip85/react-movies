import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import MoviesPage from "../features/movies/pages/MoviesPage";
import MovieDetailPage from "../features/movies/pages/MovieDetailPage";
import PersonDetailPage from "../features/people/pages/PersonDetailPage";
import FavoritesPage from "../features/favorites/pages/FavoritePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import NotFoundPage from "../features/home/pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/person/:id" element={<PersonDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<NotFoundPage />} />

            <Route
            path="/favorites"
            element={
                <ProtectedRoute>
                    <FavoritesPage />
                </ProtectedRoute>
            }
            />

            <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            }
            />
        </Route>
    </Routes>
  );
}