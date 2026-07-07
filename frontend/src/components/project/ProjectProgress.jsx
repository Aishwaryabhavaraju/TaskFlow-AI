export default function ProjectProgress({
  progress = 65,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="text-lg font-semibold">
        Progress
      </h2>

      <div className="mt-5 h-4 rounded-full bg-zinc-200 dark:bg-zinc-700">

        <div
          className="h-4 rounded-full bg-blue-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="mt-3 font-medium">
        {progress}% Completed
      </p>

    </div>
  );
}