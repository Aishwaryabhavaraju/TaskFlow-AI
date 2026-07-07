export default function ProjectFilter({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3"
    >
      <option value="">All Status</option>
      <option>Planning</option>
      <option>Active</option>
      <option>Completed</option>
      <option>Archived</option>
    </select>
  );
}