export default function ProjectActivity() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Recent Activity
      </h2>

      <ul className="space-y-3 text-sm text-zinc-500">
        <li>✔ Project created</li>
        <li>✔ Task added</li>
        <li>✔ Member joined</li>
      </ul>

    </div>
  );
}