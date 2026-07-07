import {
  CalendarDays,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function CalendarSummary({
  today,
  upcoming,
  overdue,
}) {
  const cards = [
    {
      title: "Today's Tasks",
      value: today,
      icon: CalendarDays,
      color: "bg-blue-500",
    },
    {
      title: "Upcoming",
      value: upcoming,
      icon: Clock,
      color: "bg-green-500",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-5 shadow dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-lg p-3 ${card.color}`}
              >
                <Icon
                  size={24}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}