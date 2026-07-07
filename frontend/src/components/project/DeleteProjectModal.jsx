import toast from "react-hot-toast";
import Modal from "../ui/modal/Modal";
import Button from "../common/Button";
import useProject from "../../hooks/useProject";

export default function DeleteProjectModal({
  open,
  onClose,
  projectId,
  onDeleted,
}) {
  const {
    deleteCurrentProject,
  } = useProject();

  const remove = async () => {

    const result =
      await deleteCurrentProject(
        projectId
      );

    if (result.success) {

      toast.success(
        "Project deleted."
      );

      onDeleted();

    } else {

      toast.error(result.message);

    }

  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Project"
    >
      <p className="mb-6 text-zinc-500">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">

        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={remove}
        >
          Delete
        </Button>

      </div>

    </Modal>
  );
}