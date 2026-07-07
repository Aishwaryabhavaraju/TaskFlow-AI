export default function DueDateFilter({
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
      className="rounded-xl border p-3 dark:bg-zinc-900"
    />
  );
}