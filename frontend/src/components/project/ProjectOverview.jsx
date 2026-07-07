import { useState } from "react";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

import ProjectStatusBadge from "./ProjectStatusBadge";
import ProjectPriorityBadge from "./ProjectPriorityBadge";
import EditProjectButton from "./EditProjectButton";
import EditProjectModal from "./EditProjectModal";

export default function ProjectOverview({
  project,
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

        <div className="flex items-start justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {project.name}
            </h1>

            <p className="mt-4 text-zinc-500">
              {project.description}
            </p>

            <div className="mt-6 flex gap-3">

              <ProjectStatusBadge
                status={project.status}
              />

              <ProjectPriorityBadge
                priority={project.priority}
              />

            </div>

          </div>

          <EditProjectButton
            onClick={() =>
              setOpen(true)
            }
          />
          <Link
            to={`/projects/${project._id}/settings`}
            >
            <button className="rounded-xl border border-zinc-300 dark:border-zinc-700 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <Settings size={18} />
            </button>
          </Link>

        </div>

      </div>

      <EditProjectModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        project={project}
      />
    </>
  );
}