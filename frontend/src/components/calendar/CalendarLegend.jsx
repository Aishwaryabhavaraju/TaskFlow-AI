export default function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
      <span className="text-xs font-semibold uppercase text-zinc-400">Status Key:</span>
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="h-3 w-3 rounded-full bg-blue-500 shadow-sm"></span>
        To Do
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="h-3 w-3 rounded-full bg-amber-500 shadow-sm"></span>
        In Progress
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="h-3 w-3 rounded-full bg-purple-500 shadow-sm"></span>
        Review
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm"></span>
        Done
      </div>
    </div>
  );
}