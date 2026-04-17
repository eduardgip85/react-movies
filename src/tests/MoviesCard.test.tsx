import { screen } from "@testing-library/react";
import MovieCard from "../features/movies/components/MovieCard";
import { renderWithProviders } from "./test-utils";
import { vi } from "vitest";

vi.mock("../features/auth/hooks/useAuth", () => ({
    useAuth: () => ({
        user: null,
        loading: false,
        logout: vi.fn(),
    }),
}));

vi.mock("../features/favorites/hooks/useFavorites", () => ({
    useFavorites: () => ({
        toggleFavorite: vi.fn(),
        checkIsFavorite: vi.fn(() => false),
    }),
}));

describe("MovieCard", () => {
    it("renders movie title, year and rating", () => {
        renderWithProviders(
        <MovieCard
            movie={{
            id: 1,
            title: "Inception",
            poster_path: "/poster.jpg",
            vote_average: 8.8,
            release_date: "2010-07-16",
            }}
        />
        );

        expect(screen.getByText("Inception")).toBeInTheDocument();
        expect(screen.getByText("2010")).toBeInTheDocument();
        expect(screen.getByText("⭐ 8.8")).toBeInTheDocument();
    });
});