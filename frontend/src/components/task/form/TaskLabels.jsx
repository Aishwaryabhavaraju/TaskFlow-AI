export default function TaskLabels({
  value,
  onChange,
}) {
  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Frontend, Backend, Bug..."
      className="w-full rounded-xl border p-3 dark:bg-zinc-900"
    />
  );
}