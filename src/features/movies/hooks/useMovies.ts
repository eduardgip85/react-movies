import { useEffect, useState } from "react";
import { discoverMovies, getMoviesGenres, searchMovies, getPopularMovies } from "../services/movies.service";
import type { Movie } from "../types/movie";
import type { Genre } from "../types/genre";
import type { MovieFilters } from "../types/movieFilters";

const initialFilters: MovieFilters = {
    query: "",
    genre: "",
    minRating: "",
    year: "",
    language: "",
    sortBy: "popularity.desc",
};

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [filters, setFilters] = useState<MovieFilters>(initialFilters);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadGenres() {
        try {
            const data = await getMoviesGenres();
            setGenres(data)
        } catch (err) {
            setError("No s'han pogut carregar les pel·lícules");
        } finally {
            setLoading(false);
        }
        }

        loadGenres();
    }, []);

    useEffect(() => {
        async function loadMovies() {
            try {
                setLoading(true);
                setError(null);

                const hasQuery = filters.query.trim() !== "";

                const hasAdvancedFilters = 
                    !filters.genre &&
                    !filters.minRating &&
                    !filters.year &&
                    !filters.language &&
                    filters.sortBy === "popularity.desc";

                if (!hasQuery && !hasAdvancedFilters) {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                    return;
                }

                if (hasQuery) {
                    const data = await searchMovies(filters.query.trim());
                    setMovies(data);
                    return;
                }

                const data = await discoverMovies(filters);
                setMovies(data);

            } catch (error) {
                console.error(error);
                setError("No s'han pogut carregar les pel·lícules");
            } finally {
                setLoading(false);
            }
        }

        loadMovies();
    }, [filters]);
    

    function updateFilter<K extends keyof MovieFilters>(key: K, value: MovieFilters[K]){
        setFilters((prev) => ({
            ...prev,
            [key]:value,
        }));
    }

    function resetFilters() {
        setFilters(initialFilters)
    }

    return {
        movies,
        genres,
        filters,
        loading,
        error,
        updateFilter,
        resetFilters,
    };
}