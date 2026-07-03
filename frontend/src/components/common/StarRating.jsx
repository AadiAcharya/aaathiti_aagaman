import { Star } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// A row of 5 stars filled to match a numeric rating (supports half stars),
// e.g. 4.5 renders 4 full stars + 1 half-filled star.
export default function StarRating({
  rating = 0,
  reviews,
  showValue = false,
  size = "w-4 h-4",
}) {
  const { theme } = useTheme();
  const rounded = Math.round((rating || 0) * 2) / 2;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => {
          const fillPercent = Math.max(0, Math.min(1, rounded - (i - 1))) * 100;
          return (
            <span key={i} className="relative inline-block leading-none">
              <Star
                className={`${size} ${theme === "dark" ? "text-text-muted/30" : "text-gray-300"}`}
              />
              <span
                className="absolute inset-0 top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star className={`${size} text-yellow-500 fill-yellow-500`} />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span
          className={`text-sm font-semibold ${
            theme === "dark" ? "text-text-primary" : "text-gray-800"
          }`}
        >
          {(rating || 0).toFixed(1)}
          {typeof reviews === "number" && (
            <span
              className={`font-normal ml-1 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-500"
              }`}
            >
              ({reviews})
            </span>
          )}
        </span>
      )}
    </div>
  );
}
