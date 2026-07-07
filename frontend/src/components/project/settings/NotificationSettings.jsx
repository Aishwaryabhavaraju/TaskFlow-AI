export default function NotificationSettings() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold mb-5">
        Notifications
      </h2>

      <div className="space-y-4">

        <label className="flex justify-between">

          Email Notifications

          <input type="checkbox" defaultChecked />

        </label>

        <label className="flex justify-between">

          Push Notifications

          <input type="checkbox" defaultChecked />

        </label>

        <label className="flex justify-between">

          Weekly Reports

          <input type="checkbox" />

        </label>

      </div>

    </div>
  );
}