import Modal from "../modal/Modal";
import Button from "../../common/Button";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
    >
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        {message}
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}