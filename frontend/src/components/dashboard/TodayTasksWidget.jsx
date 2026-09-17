const formatDueDate = (dateString) => {
  if (!dateString) return "Today";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) !== "12:00 AM"
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Due Today";
};

export default function TodayTasksWidget({
  tasks,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold">
        Today's Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-zinc-500">
          No tasks for today.
        </p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-lg border p-3 dark:border-zinc-700"
            >
              <h3 className="font-medium">
                {task.title}
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                {formatDueDate(task.dueDate)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}