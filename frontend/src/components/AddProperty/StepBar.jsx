import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const STEPS = ["Type", "Amenities", "Description", "Facilities", "Safety", "Post"];
const ROUTES = ["/add-property", "/amenities", "/description", "/facilities", "/safety", "/post"];

export default function StepBar({ current }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 pt-8 pb-2">
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const reachable = i <= current;
          return (
            <div key={s} className="flex items-center gap-2 flex-1">
              <button
                type="button"
                aria-label={`Go to step ${i + 1}: ${s}`}
                onClick={() => reachable && i !== current && navigate(ROUTES[i])}
                disabled={!reachable}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-[var(--duration-fast)] ${
                  done
                    ? "bg-primary text-white hover:bg-primary-hover cursor-pointer"
                    : active
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-bg-secondary text-text-muted border border-border cursor-not-allowed"
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </button>
              <span
                className={`text-xs font-semibold hidden sm:block ${
                  active ? "text-primary" : "text-text-muted"
                }`}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 rounded ${i < current ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
