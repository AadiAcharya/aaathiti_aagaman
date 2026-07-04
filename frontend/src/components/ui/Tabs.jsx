export default function Tabs({ tabs, active, onChange, variant = "underline", className = "" }) {
  if (variant === "pill") {
    return (
      <div className={`inline-flex items-center gap-1 rounded-full bg-bg-secondary p-1 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium
              transition-colors duration-[var(--duration-fast)]
              ${active === tab.id ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"}`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
            {tab.label}
            {tab.count != null && (
              <span className={active === tab.id ? "text-white/80" : "text-text-muted"}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-6 border-b border-border overflow-x-auto ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative pb-3 text-sm font-semibold whitespace-nowrap transition-colors duration-[var(--duration-fast)]
            ${active === tab.id ? "text-primary" : "text-text-secondary hover:text-text-primary"}`}
        >
          <span className="inline-flex items-center gap-1.5">
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
            {tab.count != null && <span className="text-xs text-text-muted">{tab.count}</span>}
          </span>
          {active === tab.id && (
            <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
