import Button from "../common/Button";
import { Plus } from "lucide-react";
import LiveIndicator from "../collaboration/LiveIndicator";

export default function TaskBoardHeader({
  onCreateTask,
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Task Board
        </h1>
        <p className="text-zinc-500">
          Manage your project tasks efficiently.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <LiveIndicator />

        <button
          onClick={onCreateTask}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>
    </div>
  );
}