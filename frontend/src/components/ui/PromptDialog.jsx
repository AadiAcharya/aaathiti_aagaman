import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

export default function PromptDialog({
  open,
  title,
  description,
  label,
  placeholder,
  confirmLabel = "Submit",
  cancelLabel = "Cancel",
  danger = false,
  loading = false,
  required = true,
  onConfirm,
  onCancel,
}) {
  const [value, setValue] = useState("");

  // Every exit path (cancel, backdrop click, Escape, or a successful submit)
  // clears the field, so the next time this dialog opens it's always fresh —
  // no effect/ref needed to detect the closed->open transition.
  const handleCancel = () => {
    setValue("");
    onCancel();
  };

  const handleConfirm = () => {
    const trimmed = value.trim();
    if (required && !trimmed) return;
    setValue("");
    onConfirm(trimmed);
  };

  return (
    <Modal open={open} onClose={handleCancel} size="sm">
      <Modal.Header title={title} onClose={handleCancel} />
      <Modal.Body className="space-y-3">
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
        <Input
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoFocus
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="ghost" onClick={handleCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={danger ? "danger" : "primary"}
          onClick={handleConfirm}
          loading={loading}
          disabled={required && !value.trim()}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
