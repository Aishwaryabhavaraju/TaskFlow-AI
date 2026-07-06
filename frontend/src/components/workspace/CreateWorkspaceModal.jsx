import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../ui/modal/Modal";
import WorkspaceForm from "./WorkspaceForm";

import useWorkspace from "../../hooks/useWorkspace";

export default function CreateWorkspaceModal({
  open,
  onClose,
}) {
  const { addWorkspace } =
    useWorkspace();

  const [submitting, setSubmitting] =
    useState(false);

  const handleSubmit = async (
    formData
  ) => {
    setSubmitting(true);

    const result =
      await addWorkspace(formData);

    setSubmitting(false);

    if (result.success) {
      toast.success(
        "Workspace created successfully!"
      );

      onClose();
    } else {
      toast.error(
        result.message ||
          "Unable to create workspace."
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Workspace"
    >
      <WorkspaceForm
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </Modal>
  );
}