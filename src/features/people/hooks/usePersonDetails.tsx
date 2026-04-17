import { useEffect, useState } from "react";
import { getPersonById, getPersonMovieCredits } from "../services/person.service";
import type { Person, PersonMovieCredit } from "../types/person";

export function usePersonDetail(id: string) {
  const [person, setPerson] = useState<Person | null>(null);
  const [movies, setMovies] = useState<PersonMovieCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPersonDetail() {
      try {
        const [personData, creditsData] = await Promise.all([
          getPersonById(id),
          getPersonMovieCredits(id),
        ]);

        setPerson(personData);
        setMovies(creditsData.cast.slice(0, 12));
      } catch (err) {
        console.error(err);
        setError("Error carregant la persona");
      } finally {
        setLoading(false);
      }
    }

    loadPersonDetail();
  }, [id]);

  return {
    person,
    movies,
    loading,
    error,
  };
}