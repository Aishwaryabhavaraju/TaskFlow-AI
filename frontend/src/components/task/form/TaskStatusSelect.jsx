export default function TaskStatusSelect({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border p-3 dark:bg-zinc-900"
    >
      <option>Todo</option>
      <option>In Progress</option>
      <option>Review</option>
      <option>Done</option>
    </select>
  );
}