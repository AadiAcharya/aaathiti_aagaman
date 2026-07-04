const VARIANTS = {
  default:
    "text-text-secondary hover:text-text-primary hover:bg-bg-secondary",
  ghost:
    "text-text-muted hover:text-text-primary hover:bg-bg-secondary",
  danger: "text-danger hover:bg-danger-subtle",
  solid: "bg-bg-secondary text-text-primary hover:bg-bg-elevated border border-border",
};

const SIZES = {
  sm: { box: "w-8 h-8", icon: "w-3.5 h-3.5" },
  md: { box: "w-9 h-9", icon: "w-4 h-4" },
  lg: { box: "w-11 h-11", icon: "w-5 h-5" },
};

export default function IconButton(props) {
  const {
    icon: Icon,
    label,
    variant = "default",
    size = "md",
    className = "",
    ...rest
  } = props;
  const s = SIZES[size] || SIZES.md;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full shrink-0
        transition-colors duration-[var(--duration-fast)] active:scale-[0.94]
        disabled:opacity-50 disabled:pointer-events-none
        ${VARIANTS[variant] || VARIANTS.default} ${s.box} ${className}`}
      {...rest}
    >
      <Icon className={s.icon} />
    </button>
  );
}
