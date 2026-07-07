import Button from "../common/Button";

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <Button className="w-full">
          New Project
        </Button>

        <Button
          variant="secondary"
          className="w-full"
        >
          Invite Member
        </Button>

        <Button
          variant="secondary"
          className="w-full"
        >
          AI Summary
        </Button>

      </div>

    </div>
  );
}