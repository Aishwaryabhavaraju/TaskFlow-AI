import { Building2 } from "lucide-react";

export default function WorkspaceCard({
  workspace,
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-zinc-200
      dark:border-zinc-700
      bg-white
      dark:bg-zinc-900
      p-6
      transition
      hover:shadow-lg
      "
    >
      <div className="mb-4 flex items-center gap-4">

        <div className="rounded-xl bg-yellow-500 p-3 text-white">
          <Building2 />
        </div>

        <div>

          <h2 className="text-lg font-semibold">
            {workspace.name}
          </h2>

          <p className="text-sm text-zinc-500">
            {workspace.description}
          </p>

        </div>

      </div>

      <div className="mt-6 text-sm text-zinc-500">
        {workspace.members?.length || 0} Members
      </div>
    </div>
  );
}