export default function TaskTitleField({
  value,
  onChange,
}) {
  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Task Title"
      className="w-full rounded-xl border p-3 dark:bg-zinc-900"
    />
  );
}