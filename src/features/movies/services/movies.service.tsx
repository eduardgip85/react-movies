import { tmdbRequest } from "../../../shared/services/tmdb.service";
import type { Movie } from "../types/movie";
import type { MovieCreditsResponse } from "../types/cast";
import type { GenresResponse, Genre } from "../types/genre";
import type { MovieFilters } from "../types/movieFilters";

type MoviesResponse = {
  results: Movie[];
};

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await tmdbRequest<MoviesResponse>({
    endpoint: "/movie/popular",
  });

  return data.results;
}

export async function getMovieById(id: string): Promise<Movie> {
    const data = await tmdbRequest<Movie>({
       endpoint: `/movie/${id}`,
    });
    return data;
}

export async function getMovieCredits(id: string): Promise<MovieCreditsResponse> {
    const data = await tmdbRequest<MovieCreditsResponse>({
        endpoint: `/movie/${id}/credits`,
    });

    return data;
}

export async function getMoviesGenres(): Promise<Genre[]> {
    const data = await tmdbRequest<GenresResponse>({
        endpoint: `/genre/movie/list`,
        queryParams: {
            languague: "en",
        },
    });
    return data.genres;
}

export async function searchMovies( query: string ): Promise<Movie[]> {
    const data = await tmdbRequest<MoviesResponse>({
        endpoint: `/search/movie`,
        queryParams: {
            query,
            include_adult: "false",
            languague: "en-US"
        },
    });
    return data.results;
}

export async function discoverMovies( filters: MovieFilters): Promise<Movie[]>{
    const queryParams: Record<string , string>= {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        sort_by: filters.sortBy || "popularity.desc",
    };

    if (filters.genre){
        queryParams.with_genre = filters.genre;
    }

    if(filters.minRating){
        queryParams["vote_average.gte"] = filters.minRating
        queryParams["vote_count.gte"] = "100"
    }

    if(filters.year){
        queryParams.primary_release_year = filters.year
    }

    if(filters.language){
        queryParams.with_original_language = filters.language
    }

    const data = await tmdbRequest<MoviesResponse>({
        endpoint: "/discover/movie",
        queryParams,
    });

    return data.results;
}

export async function getWatchProviders(movieId: string, country = "US") {
    const res = await tmdbRequest<any>({
        endpoint: `/movie/${movieId}/watch/providers`,
    });

    console.log("WATCH PROVIDERS RAW:", res);
    console.log("COUNTRY DATA:", res.results?.[country]);

    return res.results?.[country] ?? null;
}