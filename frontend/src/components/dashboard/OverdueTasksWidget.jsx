export default function OverdueTasksWidget({
  tasks,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-red-600">
        Overdue Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-zinc-500">
          No overdue tasks 🎉
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="mb-3 rounded-lg border border-red-300 p-3"
          >
            <h3 className="font-medium">
              {task.title}
            </h3>

            <p className="text-sm text-red-500">
              Due: {task.dueDate}
            </p>
          </div>
        ))
      )}
    </div>
  );
}