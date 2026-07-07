import { GanttChart } from "lucide-react";

export default function TimelineHeader() {
  return (
    <div className="mb-6 flex items-center gap-3">

      <GanttChart className="text-blue-600" />

      <h1 className="text-3xl font-bold">

        Timeline

      </h1>

    </div>
  );
}