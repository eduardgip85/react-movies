import { supabase } from "../../../shared/services/supabase";
import type { Favorite } from "../types/favorite";

type AddFavoriteInput = {
    userId: string;
    movieId: number;
    movieTitle: string;
    moviePoster: string | null;
    movieRating: number | null;
    personalRating?: number | null;
};

export async function getUserFavorites(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    return data as Favorite[];
}

export async function addFavorite({
    userId,
    movieId,
    movieTitle,
    moviePoster,
    movieRating,
    personalRating = null,
}: AddFavoriteInput) {
    const { data, error } = await supabase
        .from("favorites")
        .insert([
        {
            user_id: userId,
            movie_id: movieId,
            movie_title: movieTitle,
            movie_poster: moviePoster,
            movie_rating: movieRating,
            personal_rating: personalRating,
        },
        ])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data as Favorite;
}

export async function removeFavorite(userId: string, movieId: number) {
    const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId);

    if (error) {
        throw error;
    }
}

export async function isMovieFavorite(userId: string, movieId: number) {
    const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

    if (error) {
        throw error;
    }

return !!data;
}

export async function updateFavoriteRating(
    userId: string,
    movieId: number,
    personalRating: number | null
) {
    const { data, error } = await supabase
        .from("favorites")
        .update({
        personal_rating: personalRating,
        })
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data as Favorite;
}