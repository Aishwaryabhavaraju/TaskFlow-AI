import { Link } from "react-router-dom";

export default function ProjectCard({
  project,
}) {
  return (
    <Link to={`/projects/${project._id}`}>
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 hover:shadow-lg transition">

      <h2 className="text-xl font-semibold">
        {project.name}
      </h2>

      <p className="mt-3 text-zinc-500 line-clamp-2">
        {project.description}
      </p>

      <div className="mt-5 flex justify-between text-sm">

        <span>
          {project.status}
        </span>

        <span>
          {project.priority}
        </span>

      </div>

    </div>
    </Link>
  );
}