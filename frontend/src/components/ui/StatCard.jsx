export default function StatCard({ label, value, hint, icon: Icon, trend, className = "" }) {
  return (
    <div className={`rounded-card bg-bg-elevated border border-border px-5 py-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-2xl font-semibold text-text-primary tabular-nums truncate">
            {value}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mt-1">
            {label}
          </p>
          {hint && <p className="text-xs text-text-secondary mt-0.5 truncate">{hint}</p>}
        </div>
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-primary-subtle flex items-center justify-center shrink-0">
            <Icon className="w-[18px] h-[18px] text-primary" />
          </div>
        )}
      </div>
      {trend && (
        <p
          className={`mt-2 text-xs font-medium ${
            trend.direction === "up" ? "text-success" : "text-danger"
          }`}
        >
          {trend.direction === "up" ? "▲" : "▼"} {trend.label}
        </p>
      )}
    </div>
  );
}
