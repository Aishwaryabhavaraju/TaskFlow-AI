import ProjectSearch from "./ProjectSearch";
import ProjectFilter from "./ProjectFilter";
import ProjectSort from "./ProjectSort";

export default function ProjectToolbar({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  view,
  setView,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row">

      <div className="flex-1">
        <ProjectSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      <ProjectFilter
        value={status}
        onChange={setStatus}
      />

      <ProjectSort
        value={sort}
        onChange={setSort}
      />

      <button
        onClick={() =>
          setView(
            view === "grid"
              ? "list"
              : "grid"
          )
        }
        className="rounded-xl border px-5"
      >
        {view === "grid"
          ? "List"
          : "Grid"}
      </button>

    </div>
  );
}