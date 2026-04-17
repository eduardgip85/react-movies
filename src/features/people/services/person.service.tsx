import { tmdbRequest } from "../../../shared/services/tmdb.service";
import type { Person, PersonMovieCreditsResponse } from "../types/person";

export async function getPersonById(id: string): Promise<Person> {
    const data = await tmdbRequest<Person>({
        endpoint: `/person/${id}`,
    });

        return data;
}

export async function getPersonMovieCredits(id: string): Promise<PersonMovieCreditsResponse> {
    const data = await tmdbRequest<PersonMovieCreditsResponse>({
        endpoint: `/person/${id}/movie_credits`,
    });

    return data;
}