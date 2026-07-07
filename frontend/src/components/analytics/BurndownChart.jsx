export default function BurndownChart({ analytics }) {
  const points = (analytics.burndown || []).slice(-21);
  const max = Math.max(
    1,
    ...points.map((item) =>
      Math.max(
        item.actualRemaining,
        item.idealRemaining
      )
    )
  );

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Burndown Chart
        </h2>
        <div className="flex gap-4 text-xs text-zinc-500">
          <span>Ideal</span>
          <span>Actual</span>
        </div>
      </div>

      {points.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Add tasks to see burndown.
        </p>
      ) : (
        <div className="space-y-3">
          {points.map((item) => (
            <div
              key={item.date}
              className="grid grid-cols-[4.5rem_1fr] items-center gap-3 text-xs"
            >
              <span className="text-zinc-500">
                {item.date.slice(5)}
              </span>
              <div className="space-y-1">
                <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-2 rounded-full bg-zinc-400"
                    style={{
                      width: `${
                        (item.idealRemaining / max) * 100
                      }%`,
                    }}
                  />
                </div>
                <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-2 rounded-full bg-rose-500"
                    style={{
                      width: `${
                        (item.actualRemaining / max) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
