import { Calendar } from "lucide-react";

export default function DueDateBadge({
  dueDate,
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500">

      <Calendar size={15} />

      {new Date(dueDate).toLocaleDateString()}

    </div>
  );
}