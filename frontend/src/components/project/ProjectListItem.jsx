export default function ProjectListItem({
  project,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">

      <div>

        <h2 className="font-semibold">
          {project.name}
        </h2>

        <p className="text-sm text-zinc-500">
          {project.description}
        </p>

      </div>

      <div className="text-right">

        <p>{project.status}</p>

        <p>{project.priority}</p>

      </div>

    </div>
  );
}