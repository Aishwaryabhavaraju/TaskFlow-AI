import { Building2 } from "lucide-react";
import Button from "../common/Button";

export default function WorkspaceProfile({
  workspace,
  onEdit,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl text-white"
            style={{
              background: workspace.color || "#F59E0B",
            }}
          >
            <Building2 size={34} />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {workspace.name}
            </h2>

            <p className="mt-2 text-zinc-500">
              {workspace.description}
            </p>

          </div>

        </div>

        <Button onClick={onEdit}>
          Edit Workspace
        </Button>

      </div>

    </div>
  );
}