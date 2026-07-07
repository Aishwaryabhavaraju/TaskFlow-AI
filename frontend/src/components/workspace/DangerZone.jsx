import Button from "../common/Button";

export default function DangerZone({
  onDelete,
}) {
  return (
    <div
      className="
      mt-10
      rounded-2xl
      border
      border-red-300
      bg-red-50
      dark:border-red-700
      dark:bg-red-950/30
      p-6
      "
    >
      <h2 className="text-xl font-semibold text-red-600">
        Danger Zone
      </h2>

      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Permanently delete this workspace.
        This action cannot be undone.
      </p>

      <Button
        onClick={onDelete}
        className="mt-6 bg-red-600 hover:bg-red-700"
      >
        Delete Workspace
      </Button>
    </div>
  );
}