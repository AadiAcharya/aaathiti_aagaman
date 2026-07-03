export default function Card({
  hoverable = false,
  padding = "p-6",
  className = "",
  children,
  ...rest
}) {
  return (
    <div
      className={`rounded-card bg-bg-elevated border border-border shadow-card
        ${padding}
        ${hoverable ? "transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)] hover:shadow-elevated hover:-translate-y-0.5 hover:border-border-strong" : ""}
        ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
