type FavoriteIconBtnProps = {
  isFavorite: boolean;
  onClick: () => Promise<void> | void;
};

export default function FavoriteIconBtn({
  isFavorite,
  onClick,
}: FavoriteIconBtnProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void onClick();
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:scale-105 hover:bg-black/80"
    >
      <span
        className={`text-xl transition ${
          isFavorite ? "text-red-500" : "text-white"
        }`}
      >
        ♥
      </span>
    </button>
  );
}