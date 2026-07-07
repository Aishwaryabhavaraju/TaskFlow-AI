export default function TaskDueDate({
  value,
  onChange,
}) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border p-3 dark:bg-zinc-900"
    />
  );
}