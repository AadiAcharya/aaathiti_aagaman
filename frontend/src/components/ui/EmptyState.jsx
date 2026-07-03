export default function EmptyState({ icon: Icon, title, description, action, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}>
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-text-muted" />
        </div>
      )}
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      {description && (
        <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
