import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import SortDropdown from "./SortDropdown";

export default function FilterBar({
  filters,
  updateFilter,
}) {
  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-4">

      <SearchInput
        value={filters.search}
        onChange={(v) =>
          updateFilter(
            "search",
            v
          )
        }
      />

      <StatusFilter
        value={filters.status}
        onChange={(v) =>
          updateFilter(
            "status",
            v
          )
        }
      />

      <PriorityFilter
        value={
          filters.priority
        }
        onChange={(v) =>
          updateFilter(
            "priority",
            v
          )
        }
      />

      <SortDropdown
        value={filters.sort}
        onChange={(v) =>
          updateFilter(
            "sort",
            v
          )
        }
      />

    </div>
  );
}