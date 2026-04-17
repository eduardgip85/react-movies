type FavoriteButtonProps = {
    isFavorite: boolean;
    onClick: () => Promise<void>;
};

export default function FavoriteButton({
    isFavorite,
    onClick,
}: FavoriteButtonProps) {
    return (
        <button
        type="button"
        onClick={onClick}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            isFavorite
            ? "bg-red-600 text-white hover:bg-red-500"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
        >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
    );
}