import FilterChip from "./FilterChip";

export default function CalendarFilters({
  filters,
  updateFilter,
  clearFilters,
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">

      <FilterChip
        active={filters.due === "today"}
        onClick={() =>
          updateFilter("due", "today")
        }
      >
        Today
      </FilterChip>

      <FilterChip
        active={filters.due === "week"}
        onClick={() =>
          updateFilter("due", "week")
        }
      >
        This Week
      </FilterChip>

      <FilterChip
        active={filters.due === "month"}
        onClick={() =>
          updateFilter("due", "month")
        }
      >
        This Month
      </FilterChip>

      <FilterChip
        active={filters.due === "overdue"}
        onClick={() =>
          updateFilter("due", "overdue")
        }
      >
        Overdue
      </FilterChip>

      <FilterChip
        active={filters.priority === "High"}
        onClick={() =>
          updateFilter("priority", "High")
        }
      >
        High Priority
      </FilterChip>

      <FilterChip
        active={filters.assignee === "me"}
        onClick={() =>
          updateFilter("assignee", "me")
        }
      >
        My Tasks
      </FilterChip>

      <button
        onClick={clearFilters}
        className="rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        Clear
      </button>

    </div>
  );
}