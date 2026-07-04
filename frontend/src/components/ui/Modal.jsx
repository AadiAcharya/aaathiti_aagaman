import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import IconButton from "./IconButton";

const SIZES = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" };

export default function Modal({ open, onClose, size = "md", children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`animate-scale-in relative w-full ${SIZES[size] || SIZES.md}
          rounded-card bg-bg-elevated border border-border shadow-elevated`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.Header = function ModalHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      {onClose && <IconButton icon={X} label="Close" onClick={onClose} />}
    </div>
  );
};

Modal.Body = function ModalBody({ className = "", children }) {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
  return (
    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
      {children}
    </div>
  );
};
