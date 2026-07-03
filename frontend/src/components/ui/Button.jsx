import Spinner from "./Spinner";

const VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm",
  secondary:
    "bg-bg-secondary text-text-primary border border-border hover:bg-bg-elevated hover:border-border-strong",
  outline:
    "bg-transparent text-text-primary border border-border hover:bg-bg-secondary",
  ghost:
    "bg-transparent text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
  danger:
    "bg-danger text-white hover:opacity-90 shadow-sm",
  accent:
    "bg-accent text-white hover:bg-accent-hover shadow-sm",
};

const SIZES = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-sm px-6 py-2.5 gap-2",
};

export default function Button(props) {
  const {
    as: Component = "button",
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = "left",
    fullWidth = false,
    className = "",
    children,
    ...rest
  } = props;
  const isDisabled = disabled || loading;
  return (
    <Component
      disabled={Component === "button" ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      className={`inline-flex items-center justify-center rounded-[var(--radius-control)] font-medium
        transition-colors transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)]
        active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100
        ${isDisabled ? "opacity-50 pointer-events-none" : ""}
        ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md}
        ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {loading ? (
        <Spinner size="sm" className={variant === "primary" || variant === "danger" || variant === "accent" ? "text-white" : ""} />
      ) : (
        Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </Component>
  );
}
