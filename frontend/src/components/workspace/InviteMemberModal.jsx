import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import Modal from "../ui/modal/Modal";
import InviteMemberForm from "./InviteMemberForm";

import useWorkspace from "../../hooks/useWorkspace";

export default function InviteMemberModal({
  open,
  onClose,
  onSuccess,
}) {
  const { workspaceId } =
    useParams();

  const { sendInvitation } =
    useWorkspace();

  const handleSubmit = async (
    inviteData
  ) => {
    const result =
      await sendInvitation(
        workspaceId,
        inviteData
      );

    if (result.success) {

      toast.success(
        "Invitation sent successfully!"
      );

      onSuccess?.();

      onClose();

    } else {

      toast.error(
        result.message ||
          "Failed to send invitation."
      );

    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invite Member"
    >
      <InviteMemberForm
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}