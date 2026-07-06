import WidgetCard from "./WidgetCard";

const members = [
  "Aishwarya updated TaskFlow AI",
  "John completed UI Review",
  "Emma added 5 tasks",
];

export default function TeamActivity() {
  return (
    <WidgetCard title="Team Activity">

      <div className="space-y-4">

        {members.map((activity) => (
          <div
            key={activity}
            className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3"
          >
            {activity}
          </div>
        ))}

      </div>

    </WidgetCard>
  );
}