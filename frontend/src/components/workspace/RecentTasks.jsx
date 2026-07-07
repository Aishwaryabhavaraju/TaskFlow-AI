const tasks = [
  "Design Dashboard",
  "Create Login API",
  "Fix Notification UI",
];

export default function RecentTasks() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task}
            className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4"
          >
            {task}
          </div>
        ))}
      </div>

    </div>
  );
}