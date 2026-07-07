export default function WorkspaceStatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h2
        className="mt-3 text-3xl font-bold"
        style={{ color }}
      >
        {value}
      </h2>

    </div>
  );
}