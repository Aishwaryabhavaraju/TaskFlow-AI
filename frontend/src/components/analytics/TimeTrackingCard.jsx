export default function TimeTrackingCard({ analytics }) {
  const { timeTracking } = analytics;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-5 text-lg font-semibold">
        Time Tracking
      </h2>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-zinc-500">Estimated</p>
          <p className="text-2xl font-bold">
            {timeTracking.estimatedHours}
          </p>
        </div>
        <div>
          <p className="text-zinc-500">Actual</p>
          <p className="text-2xl font-bold">
            {timeTracking.actualHours}
          </p>
        </div>
        <div>
          <p className="text-zinc-500">Accuracy</p>
          <p className="text-2xl font-bold">
            {timeTracking.accuracy}%
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        Variance: {timeTracking.varianceHours} hours
      </p>
    </div>
  );
}
