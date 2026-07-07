import toast from "react-hot-toast";

import Modal from "../ui/modal/Modal";
import EditWorkspaceForm from "./EditWorkspaceForm";

import useWorkspace from "../../hooks/useWorkspace";

export default function EditWorkspaceModal({
  open,
  onClose,
  workspace,
}) {
  const { editWorkspace } = useWorkspace();

  const submit = async (formData) => {
    const result = await editWorkspace(
      workspace._id,
      formData
    );

    if (result.success) {
      toast.success("Workspace updated");

      onClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Workspace"
    >
      <EditWorkspaceForm
        workspace={workspace}
        onSubmit={submit}
      />
    </Modal>
  );
}