export default function PrivacySettings() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold mb-5">
        Privacy
      </h2>

      <select className="w-full rounded-xl border p-3 dark:bg-zinc-900">

        <option>Private</option>

        <option>Public</option>

      </select>

    </div>
  );
}