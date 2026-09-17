import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../services/projectService";
import { FolderKanban } from "lucide-react";

export default function RecentProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
      <h2 className="mb-5 text-xl font-semibold">Recent Projects</h2>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <FolderKanban className="mb-2 text-zinc-400" size={28} />
          <p className="text-sm text-zinc-500">No projects found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.slice(0, 5).map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="block rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-4 transition"
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                {project.name}
              </p>
              {project.description && (
                <p className="mt-1 text-xs text-zinc-500 truncate">
                  {project.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}