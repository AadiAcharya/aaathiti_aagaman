import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} onClose={onCancel} size="sm">
      <Modal.Header title={title} onClose={onCancel} />
      {description && (
        <Modal.Body>
          <p className="text-sm text-text-secondary">{description}</p>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={danger ? "danger" : "primary"}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
