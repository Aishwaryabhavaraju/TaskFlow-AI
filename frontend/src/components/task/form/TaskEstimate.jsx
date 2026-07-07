export default function TaskEstimate({
  value,
  onChange,
}) {
  return (
    <input
      type="number"
      min="0"
      placeholder="Estimated Hours"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border p-3 dark:bg-zinc-900"
    />
  );
}