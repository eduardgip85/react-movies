export type Favorite = {
    id: string;
    user_id: string;
    movie_id: number;
    movie_title: string;
    movie_poster: string | null;
    movie_rating: number | null;
    personal_rating: number | null;
    created_at: string;
};