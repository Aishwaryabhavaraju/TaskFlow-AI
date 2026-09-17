import { CalendarDays, Calendar as CalendarIcon, Clock } from "lucide-react";

export default function CalendarToolbar({ view, setView }) {
  const views = [
    { key: "month", label: "Month View", icon: CalendarDays },
    { key: "week", label: "Week View", icon: CalendarIcon },
    { key: "day", label: "Day View", icon: Clock },
  ];

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center gap-2">
        {views.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-yellow-400 text-black font-semibold shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}