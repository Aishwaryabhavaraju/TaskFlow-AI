import PageHeader from "../layout/PageHeader";
import { Plus } from "lucide-react";

export default function CalendarHeader({ onCreateTask }) {
  return (
    <PageHeader
      title="Calendar"
      description="View, schedule, and organize workspace tasks across dates and timelines."
    >
      {onCreateTask && (
        <button
          onClick={onCreateTask}
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 font-medium text-black transition hover:bg-yellow-300 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </button>
      )}
    </PageHeader>
  );
}