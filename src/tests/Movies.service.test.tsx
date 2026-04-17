import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getPopularMovies, getMovieById } from "../features/movies/services/movies.service";

describe("movies.service", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("getPopularMovies should return movie results", async () => {
        const mockMovies = {
        results: [
            {
            id: 1,
            title: "Inception",
            poster_path: "/poster.jpg",
            vote_average: 8.8,
            release_date: "2010-07-16",
            },
        ],
        };

        vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(mockMovies), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
        );

        const result = await getPopularMovies();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("Inception");
    });

    it("getMovieById should return one movie", async () => {
        const mockMovie = {
        id: 10,
        title: "Interstellar",
        poster_path: "/interstellar.jpg",
        vote_average: 8.6,
        overview: "A science fiction film",
        release_date: "2014-11-07",
        };

        vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(mockMovie), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
        );

        const result = await getMovieById("10");

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result.id).toBe(10);
        expect(result.title).toBe("Interstellar");
    });

    it("should throw an error if the request fails", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, { status: 500 })
        );

        await expect(getPopularMovies()).rejects.toThrow(
        "TMDB request failed: 500"
        );
    });
});