export default function Logo({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" className="fill-primary/10" />
      <circle cx="20" cy="20" r="18" className="stroke-primary" strokeWidth="2" />
      <text
        x="20"
        y="26"
        fontSize="15"
        fontWeight="700"
        textAnchor="middle"
        className="fill-primary"
        fontFamily="'Playfair Display', serif"
      >
        AA
      </text>
    </svg>
  );
}
