import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../ui/dialog/ConfirmDialog";
import useWorkspace from "../../hooks/useWorkspace";

export default function DeleteWorkspaceDialog({
  open,
  onClose,
  workspace,
}) {
  const navigate = useNavigate();

  const { removeWorkspace } = useWorkspace();

  const handleDelete = async () => {
    const result =
      await removeWorkspace(workspace._id);

    if (result.success) {
      toast.success(
        "Workspace deleted successfully"
      );

      navigate("/workspaces");

    } else {

      toast.error(result.message);

    }
  };

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={handleDelete}
      title="Delete Workspace"
      message={`Are you sure you want to delete "${workspace.name}"? This action cannot be undone.`}
    />
  );
}