import WidgetCard from "./WidgetCard";

const activities = [
  "Project created",
  "Task assigned",
  "Task completed",
  "New member joined",
];

export default function RecentActivity() {
  return (
    <WidgetCard title="Recent Activity">

      <div className="space-y-4">

        {activities.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-3"
          >
            {item}
          </div>
        ))}

      </div>

    </WidgetCard>
  );
}