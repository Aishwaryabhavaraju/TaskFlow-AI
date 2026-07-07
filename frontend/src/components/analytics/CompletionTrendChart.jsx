export default function CompletionTrendChart({
  analytics,
}) {
  const trend = analytics.completionTrend || [];
  const max = Math.max(
    1,
    ...trend.map((item) => item.completed)
  );

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-5 text-lg font-semibold">
        Task Completion Trends
      </h2>

      {trend.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No completed tasks in this report.
        </p>
      ) : (
        <div className="flex h-48 items-end gap-2">
          {trend.slice(-14).map((item) => (
            <div
              key={item.date}
              className="flex min-w-8 flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t bg-sky-500"
                style={{
                  height: `${Math.max(
                    8,
                    (item.completed / max) * 150
                  )}px`,
                }}
                title={`${item.date}: ${item.completed}`}
              />
              <span className="text-xs text-zinc-500">
                {item.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
