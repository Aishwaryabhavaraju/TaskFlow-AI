export default function UpcomingTasksWidget({
  tasks,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold">
        Upcoming Deadlines
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex items-center justify-between"
          >
            <span>{task.title}</span>

            <span className="text-sm text-zinc-500">
              {task.dueDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}