import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ArchiveProjectButton from "./ArchiveProjectButton";
import RestoreProjectButton from "./RestoreProjectButton";
import DeleteProjectButton from "./DeleteProjectButton";
import DeleteProjectModal from "./DeleteProjectModal";

import useProject from "../../hooks/useProject";

export default function DangerZone({
  project,
}) {
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const {
    archiveCurrentProject,
    restoreCurrentProject,
  } = useProject();

  const archive = async () => {

    const result =
      await archiveCurrentProject(
        project._id
      );

    if (result.success) {

      toast.success(
        "Project archived."
      );

    }

  };

  const restore = async () => {

    const result =
      await restoreCurrentProject(
        project._id
      );

    if (result.success) {

      toast.success(
        "Project restored."
      );

    }

  };

  return (
    <>
      <div className="rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-6">

        <h2 className="text-xl font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="mt-2 mb-6 text-sm text-zinc-500">
          Archive or permanently delete this project.
        </p>

        <div className="flex flex-wrap gap-3">

          {project.status ===
          "Archived" ? (
            <RestoreProjectButton
              onClick={restore}
            />
          ) : (
            <ArchiveProjectButton
              onClick={archive}
            />
          )}

          <DeleteProjectButton
            onClick={() =>
              setOpen(true)
            }
          />

        </div>

      </div>

      <DeleteProjectModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        projectId={project._id}
        onDeleted={() =>
          navigate("/projects")
        }
      />
    </>
  );
}