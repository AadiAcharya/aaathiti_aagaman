import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "./IconButton";

export default function Pagination({ page, totalPages, onPageChange, siblingCount = 1 }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - siblingCount);
  const end = Math.min(totalPages, page + siblingCount);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("…");
  }
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <IconButton
        icon={ChevronLeft}
        label="Previous page"
        variant="solid"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      />
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="w-8 text-center text-sm text-text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-[var(--radius-control)] text-sm font-medium transition-colors
              ${p === page ? "bg-primary text-white" : "text-text-secondary hover:bg-bg-secondary"}`}
          >
            {p}
          </button>
        ),
      )}
      <IconButton
        icon={ChevronRight}
        label="Next page"
        variant="solid"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </div>
  );
}
