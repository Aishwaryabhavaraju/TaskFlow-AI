import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import ConfirmDialog from "../ui/dialog/ConfirmDialog";

import useWorkspace from "../../hooks/useWorkspace";

export default function RemoveMemberDialog({
  open,
  onClose,
  member,
  onSuccess,
}) {
  const { workspaceId } =
    useParams();

  const { deleteMember } =
    useWorkspace();

  const remove = async () => {
    const result =
      await deleteMember(
        workspaceId,
        member._id
      );

    if (result.success) {

      toast.success(
        "Member removed"
      );

      onSuccess();

      onClose();

    } else {

      toast.error(result.message);

    }
  };

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={remove}
      title="Remove Member"
      message={`Remove ${member.name} from this workspace?`}
    />
  );
}