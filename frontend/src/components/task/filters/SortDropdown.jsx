export default function SortDropdown({
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
      <option value="createdAt">
        Created Date
      </option>

      <option value="priority">
        Priority
      </option>

      <option value="dueDate">
        Due Date
      </option>

      <option value="title">
        Title
      </option>
    </select>
  );
}