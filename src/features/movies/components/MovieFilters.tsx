import type { Genre } from "../types/genre";
import type { MovieFilters as MovieFiltersType } from "../types/movieFilters";

type MovieFiltersProps = {
    filters: MovieFiltersType;
    genres: Genre[];
    onChange: <K extends keyof MovieFiltersType>(
        key: K,
        value: MovieFiltersType[K]
    ) => void;
    onReset: () => void;
};

export default function MovieFilters({
    filters,
    genres,
    onChange,
    onReset,
}: MovieFiltersProps) {
    return (
        <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <input
            type="text"
            placeholder="Search movie..."
            value={filters.query}
            onChange={(e) => onChange("query", e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none"
            />

            <select
            value={filters.genre}
            onChange={(e) => onChange("genre", e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm"
            >
            <option value="">All genres</option>
            {genres.map((genre) => (
                <option key={genre.id} value={String(genre.id)}>
                {genre.name}
                </option>
            ))}
            </select>

            <select
            value={filters.minRating}
            onChange={(e) => onChange("minRating", e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm"
            >
            <option value="">Any rating</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            </select>

            <input
            type="number"
            min="1900"
            max="2099"
            placeholder="Year"
            value={filters.year}
            onChange={(e) => onChange("year", e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm"
            />

            <select
            value={filters.language}
            onChange={(e) => onChange("language", e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm"
            >
            <option value="">Any language</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            </select>

            <select
            value={filters.sortBy}
            onChange={(e) => onChange("sortBy", e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm"
            >
            <option value="popularity.desc">Most popular</option>
            <option value="primary_release_date.desc">Newest</option>
            <option value="primary_release_date.asc">Oldest</option>
            <option value="vote_average.desc">Best rated</option>
            <option value="title.asc">Title A-Z</option>
            <option value="title.desc">Title Z-A</option>
            </select>
        </div>

        <div className="mt-4 flex justify-end">
            <button
            type="button"
            onClick={onReset}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-500"
            >
            Reset filters
            </button>
        </div>
        </section>
    );
}