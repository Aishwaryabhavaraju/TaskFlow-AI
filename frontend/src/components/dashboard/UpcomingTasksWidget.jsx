const formatDueDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function UpcomingTasksWidget({
  tasks,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold">
        Upcoming Deadlines
      </h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-zinc-500">No upcoming deadlines.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800"
            >
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]">{task.title}</span>

              <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                {formatDueDate(task.dueDate)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}