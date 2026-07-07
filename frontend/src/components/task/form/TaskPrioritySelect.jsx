export default function TaskPrioritySelect({
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
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
      <option>Critical</option>
    </select>
  );
}