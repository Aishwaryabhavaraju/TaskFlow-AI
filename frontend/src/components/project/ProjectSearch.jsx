export default function ProjectSearch({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Search projects..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3"
    />
  );
}