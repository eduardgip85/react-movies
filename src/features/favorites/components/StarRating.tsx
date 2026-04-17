type StarRatingProps = {
  value: number | null;
  onChange: (rating: number) => void;
};

export default function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = value !== null && value >= star;

        return (
          <span
            key={star}
            onClick={() => onChange(star)}
            className={`cursor-pointer text-2xl transition-transform hover:scale-110 ${
              isActive ? "text-yellow-400" : "text-gray-600"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}