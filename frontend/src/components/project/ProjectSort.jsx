export default function ProjectSort({
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
      <option value="name">
        Name
      </option>

      <option value="priority">
        Priority
      </option>

      <option value="createdAt">
        Created Date
      </option>
    </select>
  );
}