export default function Input({
  label,
  error,
  hint,
  icon: Icon,
  className = "",
  id,
  name,
  ...rest
}) {
  const inputId = id || name;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        )}
        <input
          id={inputId}
          name={name}
          className={`w-full rounded-[var(--radius-control)] border bg-bg-sunken text-text-primary placeholder-text-muted
            px-3.5 py-2.5 text-sm outline-none transition-colors duration-[var(--duration-fast)]
            focus:border-primary focus:ring-2 focus:ring-primary/20
            ${error ? "border-danger" : "border-border"} ${Icon ? "pl-9" : ""} ${className}`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}
