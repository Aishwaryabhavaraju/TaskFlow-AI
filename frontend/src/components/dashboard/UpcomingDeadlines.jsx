import WidgetCard from "./WidgetCard";

const deadlines = [
  {
    title: "Finish Dashboard",
    date: "Tomorrow",
  },
  {
    title: "Client Meeting",
    date: "Friday",
  },
  {
    title: "Deploy Backend",
    date: "Next Week",
  },
];

export default function UpcomingDeadlines() {
  return (
    <WidgetCard title="Upcoming Deadlines">

      <div className="space-y-4">

        {deadlines.map((item) => (
          <div
            key={item.title}
            className="flex justify-between rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3"
          >
            <span>{item.title}</span>

            <span className="text-yellow-500">
              {item.date}
            </span>

          </div>
        ))}

      </div>

    </WidgetCard>
  );
}