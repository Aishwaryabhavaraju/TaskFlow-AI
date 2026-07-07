export default function CalendarToolbar({
  view,
  setView,
}) {
  const views = [
    {
      key: "month",
      label: "Month",
    },
    {
      key: "week",
      label: "Week",
    },
    {
      key: "day",
      label: "Day",
    },
  ];

  return (
    <div className="mb-5 flex flex-wrap gap-3">
      {views.map((item) => (
        <button
          key={item.key}
          onClick={() =>
            setView(item.key)
          }
          className={`rounded-lg px-4 py-2 transition ${
            view === item.key
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 dark:bg-zinc-700"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}