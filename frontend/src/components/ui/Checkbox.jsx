import { Check } from "lucide-react";

export default function Checkbox({ label, checked, onChange, className = "", ...rest }) {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${className}`}
    >
      <span
        className={`relative w-[18px] h-[18px] shrink-0 rounded-[5px] border flex items-center justify-center
          transition-colors duration-[var(--duration-fast)]
          ${checked ? "bg-primary border-primary" : "bg-bg-sunken border-border-strong"}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          {...rest}
        />
        <Check
          className={`w-3 h-3 text-white ${checked ? "opacity-100" : "opacity-0"}`}
          strokeWidth={3}
        />
      </span>
      {label && <span className="text-sm text-text-secondary">{label}</span>}
    </label>
  );
}
