export default function ProjectStatusSelect({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3"
    >
      <option value="Planning">Planning</option>
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
  );
}