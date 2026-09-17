import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WidgetCard from "./WidgetCard";
import { getProjects } from "../../services/projectService";
import { getTasks } from "../../services/taskService";
import { FolderKanban, Loader2 } from "lucide-react";

export default function ProjectOverview() {
  const [projectsList, setProjectsList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, tasksData] = await Promise.all([
          getProjects().catch(() => []),
          getTasks().catch(() => []),
        ]);

        const projects = Array.isArray(projectsData) ? projectsData : [];
        const rawTasks = Array.isArray(tasksData)
          ? tasksData
          : tasksData?.tasks || tasksData?.data || [];

        setProjectsList(projects);
        setTasksList(rawTasks);
      } catch {
        setProjectsList([]);
        setTasksList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <WidgetCard title="Project Progress">
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="animate-spin text-yellow-500" size={24} />
        </div>
      ) : projectsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <FolderKanban className="mb-2 text-zinc-400" size={32} />
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            No projects found yet.
          </p>
          <Link
            to="/projects"
            className="mt-3 inline-flex items-center text-xs font-semibold text-yellow-500 hover:underline"
          >
            Create your first project →
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {projectsList.map((project) => {
            const projectTasks = tasksList.filter((task) => {
              const taskProjId =
                typeof task.project === "object"
                  ? task.project?._id
                  : task.project;
              return (
                taskProjId &&
                project._id &&
                taskProjId.toString() === project._id.toString()
              );
            });

            const totalTasks = projectTasks.length;
            const completedTasks = projectTasks.filter(
              (task) =>
                task.status === "Done" || task.status === "Completed"
            ).length;

            const progress =
              totalTasks === 0
                ? 0
                : Math.round((completedTasks / totalTasks) * 100);

            return (
              <div key={project._id || project.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <Link
                    to={`/projects/${project._id}`}
                    className="font-semibold text-zinc-900 hover:text-yellow-500 dark:text-zinc-100 dark:hover:text-yellow-400"
                  >
                    {project.name}
                  </Link>
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">
                    {totalTasks === 0 ? (
                      <span className="text-xs font-medium text-zinc-400">
                        No tasks yet (0%)
                      </span>
                    ) : (
                      `${progress}%`
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    {totalTasks === 0
                      ? "0 tasks added"
                      : `${completedTasks} of ${totalTasks} completed`}
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </WidgetCard>
  );
}