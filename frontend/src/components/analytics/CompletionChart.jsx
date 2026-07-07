export default function CompletionChart({ progress }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Project Progress
        </h2>
        <span className="text-2xl font-bold">
          {progress}%
        </span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
