import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  error,
  className = "",
  id,
  name,
  children,
  ...rest
}) {
  const selectId = id || name;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          className={`w-full appearance-none rounded-[var(--radius-control)] border bg-bg-sunken text-text-primary
            px-3.5 py-2.5 pr-9 text-sm outline-none transition-colors duration-[var(--duration-fast)]
            focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer
            ${error ? "border-danger" : "border-border"} ${className}`}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
