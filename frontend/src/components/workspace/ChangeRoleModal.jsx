import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import Modal from "../ui/modal/Modal";
import ChangeRoleForm from "./ChangeRoleForm";

import useWorkspace from "../../hooks/useWorkspace";

export default function ChangeRoleModal({
  open,
  onClose,
  member,
  onSuccess,
}) {
  const { workspaceId } =
    useParams();

  const { changeMemberRole } =
    useWorkspace();

  const submit = async (role) => {
    const result =
      await changeMemberRole(
        workspaceId,
        member._id,
        role
      );

    if (result.success) {

      toast.success(
        "Role updated successfully"
      );

      onSuccess();

      onClose();

    } else {

      toast.error(result.message);

    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change Member Role"
    >
      <ChangeRoleForm
        currentRole={member.role}
        onSubmit={submit}
      />
    </Modal>
  );
}