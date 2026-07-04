import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { ToastContext } from "./ToastContext";

const ICONS = { success: CheckCircle2, error: XCircle, info: Info };
const COLORS = { success: "text-success", error: "text-danger", info: "text-info" };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, { type = "info", duration = 4000 } = {}) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {createPortal(
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end pointer-events-none">
          {toasts.map((t) => {
            const Icon = ICONS[t.type] || Info;
            return (
              <div
                key={t.id}
                className="animate-toast-in pointer-events-auto flex items-center gap-2.5 rounded-[var(--radius-control)]
                  bg-bg-elevated border border-border shadow-elevated px-4 py-3 text-sm text-text-primary max-w-sm"
              >
                <Icon className={`w-4 h-4 shrink-0 ${COLORS[t.type] || COLORS.info}`} />
                <span className="flex-1">{t.message}</span>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-text-muted hover:text-text-primary"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
