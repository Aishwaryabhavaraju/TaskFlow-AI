const tasks = [
  "Finish Dashboard UI",
  "Connect Backend APIs",
  "Review Pull Request",
];

export default function RecentTasks() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Tasks
      </h2>

      <div className="space-y-4">

        {tasks.map((task) => (
          <div
            key={task}
            className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4"
          >
            {task}
          </div>
        ))}

      </div>

    </div>
  );
}