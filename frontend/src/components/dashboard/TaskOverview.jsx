import { useMemo } from "react";
import { useSelector } from "react-redux";
import WidgetCard from "./WidgetCard";

export default function TaskOverview() {
  const tasks = useSelector((state) => state.tasks.tasks || []);

  const taskSummary = useMemo(() => {
    const completed = tasks.filter((task) =>
      /done|completed/i.test(task?.status || "")
    ).length;
    const inProgress = tasks.filter((task) =>
      /in progress|active|ongoing|started/i.test(task?.status || "")
    ).length;
    const pending = tasks.filter((task) =>
      !/done|completed/i.test(task?.status || "")
    ).length;

    return [
      {
        status: "Completed",
        value: completed,
        color: "bg-green-500",
      },
      {
        status: "In Progress",
        value: inProgress,
        color: "bg-yellow-500",
      },
      {
        status: "Pending",
        value: pending,
        color: "bg-red-500",
      },
    ];
  }, [tasks]);

  return (
    <WidgetCard title="Task Overview">
      <div className="space-y-5">
        {taskSummary.map((task) => (
          <div
            key={task.status}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${task.color}`}
              />
              {task.status}
            </div>
            <strong>{task.value}</strong>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}