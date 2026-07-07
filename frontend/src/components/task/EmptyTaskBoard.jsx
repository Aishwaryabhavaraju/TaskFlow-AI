import { ClipboardList } from "lucide-react";

export default function EmptyTaskBoard() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-zinc-300 p-12 text-center">

      <ClipboardList
        size={70}
        className="mx-auto text-zinc-400"
      />

      <h2 className="mt-5 text-2xl font-bold">
        No Tasks Yet
      </h2>

      <p className="mt-2 text-zinc-500">
        Create your first task to start planning your project.
      </p>

    </div>
  );
}