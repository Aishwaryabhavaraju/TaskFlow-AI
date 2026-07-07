export default function StatusFilter({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-xl border p-3 dark:bg-zinc-900"
    >
      <option value="">All Status</option>
      <option value="Todo">Todo</option>
      <option value="In Progress">In Progress</option>
      <option value="Review">Review</option>
      <option value="Done">Done</option>
    </select>
  );
}