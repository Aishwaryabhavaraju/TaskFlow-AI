import WidgetCard from "./WidgetCard";

const tasks = [
  {
    status: "Completed",
    value: 42,
    color: "bg-green-500",
  },
  {
    status: "In Progress",
    value: 18,
    color: "bg-yellow-500",
  },
  {
    status: "Pending",
    value: 9,
    color: "bg-red-500",
  },
];

export default function TaskOverview() {
  return (
    <WidgetCard title="Task Overview">

      <div className="space-y-5">

        {tasks.map((task) => (
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