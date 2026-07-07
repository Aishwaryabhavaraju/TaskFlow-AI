const COLORS = {
  Low: "bg-emerald-500",
  Medium: "bg-sky-500",
  High: "bg-amber-500",
  Critical: "bg-red-500",
};

export default function PriorityChart({ analytics }) {
  const entries = Object.entries(
    analytics.priorityBreakdown || {}
  );
  const total = Math.max(
    analytics.overview.totalTasks,
    1
  );

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-5 text-lg font-semibold">
        Priority Mix
      </h2>

      <div className="space-y-4">
        {entries.map(([priority, count]) => (
          <div key={priority}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{priority}</span>
              <span>{count}</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className={`h-2 rounded-full ${COLORS[priority]}`}
                style={{
                  width: `${(count / total) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
