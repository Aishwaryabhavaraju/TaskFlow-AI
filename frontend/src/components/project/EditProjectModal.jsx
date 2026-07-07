import toast from "react-hot-toast";

import Modal from "../ui/modal/Modal";

import EditProjectForm from "./EditProjectForm";

import useProject from "../../hooks/useProject";

export default function EditProjectModal({
  open,
  onClose,
  project,
}) {
  const { editProject } =
    useProject();

  const submit = async (form) => {
    const result =
      await editProject(
        project._id,
        form
      );

    if (result.success) {
      toast.success(
        "Project updated successfully!"
      );

      onClose();

    } else {

      toast.error(result.message);

    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Project"
    >
      <EditProjectForm
        project={project}
        onSubmit={submit}
      />
    </Modal>
  );
}