const STATUSES = [
  "",
  "To Do",
  "In Progress",
  "Review",
  "Done",
];

const PRIORITIES = [
  "",
  "Low",
  "Medium",
  "High",
  "Critical",
];

export default function CustomReportFilters({
  filters,
  onChange,
  onApply,
  onReset,
}) {
  const update = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Custom Report
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onReset}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-black"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <input
          type="date"
          value={filters.startDate}
          onChange={(event) =>
            update("startDate", event.target.value)
          }
          className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(event) =>
            update("endDate", event.target.value)
          }
          className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        />
        <select
          value={filters.status}
          onChange={(event) =>
            update("status", event.target.value)
          }
          className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status || "All statuses"}
            </option>
          ))}
        </select>
        <select
          value={filters.priority}
          onChange={(event) =>
            update("priority", event.target.value)
          }
          className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        >
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority || "All priorities"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
