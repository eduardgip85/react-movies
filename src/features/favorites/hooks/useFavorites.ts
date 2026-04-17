import { useEffect, useState } from "react";
import type { Favorite } from "../types/favorite";
import {
    addFavorite,
    getUserFavorites,
    isMovieFavorite,
    removeFavorite,
    updateFavoriteRating,
} from "../services/favorites.service";
import { useAuth } from "../../auth/hooks/useAuth";

type ToggleFavoriteInput = {
    movieId: number;
    movieTitle: string;
    moviePoster: string | null;
    movieRating: number | null;
    personalRating?: number | null;
};

export function useFavorites() {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadFavorites() {
        if (!user) {
            setFavorites([]);
            return;
        }

        try {
            setLoading(true);
            const data = await getUserFavorites(user.id);
            setFavorites(data);
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setLoading(false);
        }
        }

        loadFavorites();
    }, [user]);

    async function toggleFavorite(input: ToggleFavoriteInput) {
        if (!user) return false;

        const alreadyFavorite = await isMovieFavorite(user.id, input.movieId);

        if (alreadyFavorite) {
            await removeFavorite(user.id, input.movieId);
            setFavorites((prev) =>
                prev.filter((fav) => fav.movie_id !== input.movieId)
            );
            return false;
        }

        const newFavorite = await addFavorite({
            userId: user.id,
            movieId: input.movieId,
            movieTitle: input.movieTitle,
            moviePoster: input.moviePoster,
            movieRating: input.movieRating,
            personalRating: input.personalRating,
        });

        setFavorites((prev) => [newFavorite, ...prev]);
        return true;
    }

    function checkIsFavorite(movieId: number) {
        return favorites.some((fav) => fav.movie_id === movieId);
    }

    async function changeFavoriteRating(movieId: number, personalRating: number) {
        if (!user) return;

        const updatedFavorite = await updateFavoriteRating(
            user.id,
            movieId,
            personalRating
        );

        setFavorites((prev) =>
            prev.map((fav) =>
                fav.movie_id === movieId ? updatedFavorite : fav
            )
        );
    }

    function getFavoriteByMovieId(movieId: number) {
        return favorites.find((fav) => fav.movie_id === movieId) ?? null;
    }

    return {
        favorites,
        loading,
        toggleFavorite,
        checkIsFavorite,
        changeFavoriteRating,
        getFavoriteByMovieId,
    };
}