import { Star } from "lucide-react";

export default function TopRatedBadge({ className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide ${className}`}
    >
      <Star className="w-3 h-3 fill-white" /> TOP RATED
    </div>
  );
}
