export default function CompletionChart({
  progress,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-6 text-lg font-semibold">
        Project Completion
      </h2>

      <div className="h-5 rounded-full bg-zinc-200 dark:bg-zinc-700">

        <div
          className="h-5 rounded-full bg-blue-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="mt-4 text-xl font-bold">
        {progress}%
      </p>

    </div>
  );
}