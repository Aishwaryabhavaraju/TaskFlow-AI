import toast from "react-hot-toast";

import Modal from "../ui/modal/Modal";

import CreateProjectForm from "./CreateProjectForm";

import useProject from "../../hooks/useProject";

export default function CreateProjectModal({
  open,
  onClose,
}) {
  const {
    createNewProject,
  } = useProject();

  const submit = async (form) => {
    const result =
      await createNewProject(form);

    if (result.success) {
      toast.success(
        "Project created successfully!"
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
      title="Create Project"
    >
      <CreateProjectForm
        onSubmit={submit}
      />
    </Modal>
  );
}