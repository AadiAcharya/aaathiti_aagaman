const TONES = {
  default: "bg-bg-secondary text-text-secondary border-border",
  primary: "bg-primary-subtle text-primary border-transparent",
  accent: "bg-accent-subtle text-accent border-transparent",
  success: "bg-success-subtle text-success border-transparent",
  warning: "bg-warning-subtle text-warning border-transparent",
  danger: "bg-danger-subtle text-danger border-transparent",
  info: "bg-info-subtle text-info border-transparent",
};

export default function Badge({ tone = "default", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill border px-2.5 py-0.5
        text-xs font-semibold whitespace-nowrap ${TONES[tone] || TONES.default} ${className}`}
    >
      {children}
    </span>
  );
}
