export default function TaskDescriptionField({
  value,
  onChange,
}) {
  return (
    <textarea
      rows={5}
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Task Description"
      className="w-full rounded-xl border p-3 dark:bg-zinc-900"
    />
  );
}