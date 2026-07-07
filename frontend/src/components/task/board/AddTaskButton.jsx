import { Plus } from "lucide-react";

export default function AddTaskButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 py-3 text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      <Plus size={18} />

      Add Task
    </button>
  );
}