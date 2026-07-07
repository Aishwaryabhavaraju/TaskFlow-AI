export default function GeneralSettings() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold mb-5">
        General
      </h2>

      <div className="space-y-5">

        <input
          placeholder="Project Name"
          className="w-full rounded-xl border p-3 dark:bg-zinc-900"
        />

        <textarea
          rows={4}
          placeholder="Project Description"
          className="w-full rounded-xl border p-3 dark:bg-zinc-900"
        />

      </div>

    </div>
  );
}