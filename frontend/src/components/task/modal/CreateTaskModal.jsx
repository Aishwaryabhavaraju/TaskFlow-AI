import { X } from "lucide-react";
import TaskForm from "./TaskForm";
import RecurrenceSelector from "../recurrence/RecurrenceSelector";

export default function CreateTaskModal({
  open,
  onClose,
  projectId,
}) {
  if (!open) return null;

  const [recurrence, setRecurrence] =
useState("None");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 dark:bg-zinc-900">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Create Task
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <TaskForm
          projectId={projectId}
          onSuccess={onClose}
        />

      </div>

    </div>
  );
}