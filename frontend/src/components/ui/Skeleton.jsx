export default function Skeleton({ className = "" }) {
  return <div className={`skeleton rounded-[var(--radius-control)] ${className}`} />;
}

export function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`rounded-card bg-bg-elevated border border-border overflow-hidden ${className}`}
    >
      <Skeleton className="h-52 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
