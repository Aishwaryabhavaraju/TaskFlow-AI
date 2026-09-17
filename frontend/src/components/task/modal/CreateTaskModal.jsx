import { X } from "lucide-react";
import TaskForm from "./TaskForm";

export default function CreateTaskModal({
  open,
  onClose,
  projectId,
  initialStatus,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 dark:bg-zinc-900 border dark:border-zinc-800 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b pb-4 dark:border-zinc-800">
          <h2 className="text-2xl font-bold">Create Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        <TaskForm
          projectId={projectId}
          initialStatus={initialStatus}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
