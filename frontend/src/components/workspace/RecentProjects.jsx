const projects = [
  "TaskFlow AI",
  "CRM Dashboard",
  "School Portal",
];

export default function RecentProjects() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Projects
      </h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project}
            className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4"
          >
            {project}
          </div>
        ))}
      </div>

    </div>
  );
}