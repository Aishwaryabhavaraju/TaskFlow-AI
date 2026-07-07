export default function TaskFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <select className="rounded-xl border p-3 dark:bg-zinc-900">
        <option>All Status</option>
        <option>Todo</option>
        <option>In Progress</option>
        <option>Review</option>
        <option>Done</option>
      </select>

      <select className="rounded-xl border p-3 dark:bg-zinc-900">
        <option>All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>

      <select className="rounded-xl border p-3 dark:bg-zinc-900">
        <option>All Assignees</option>
      </select>

    </div>
  );
}