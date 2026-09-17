import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { getProjects } from "../../services/projectService";
import { getTasks } from "../../services/taskService";

const staticPages = [
  { id: "page-dashboard", type: "Page", title: "Dashboard", description: "Overview & Workload Metrics", path: "/dashboard" },
  { id: "page-projects", type: "Page", title: "Projects", description: "Manage Workspace Projects", path: "/projects" },
  { id: "page-tasks", type: "Page", title: "My Tasks", description: "Kanban Task Board", path: "/tasks" },
  { id: "page-teams", type: "Page", title: "Teams", description: "Workspace Members & Roles", path: "/teams" },
  { id: "page-calendar", type: "Page", title: "Calendar", description: "Milestone Schedule & Deadlines", path: "/calendar" },
  { id: "page-ai", type: "Page", title: "AI Assistant", description: "AI Planning & Productivity Insights", path: "/ai" },
  { id: "page-analytics", type: "Page", title: "Analytics", description: "Project Analytics & Velocity", path: "/analytics" },
  { id: "page-reports", type: "Page", title: "Reports", description: "Export Progress Reports", path: "/reports" },
  { id: "page-files", type: "Page", title: "Files", description: "Workspace Attachments", path: "/files" },
  { id: "page-settings", type: "Page", title: "Settings", description: "Account & System Security", path: "/settings" },
];

export default function SearchModal({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (open) {
      getProjects()
        .then((data) => setProjects(Array.isArray(data) ? data : []))
        .catch(() => setProjects([]));

      getTasks()
        .then((data) => {
          const list = Array.isArray(data) ? data : data?.tasks || data?.data || [];
          setTasks(list);
        })
        .catch(() => setTasks([]));
    }
  }, [open]);

  const allItems = useMemo(() => {
    const projectItems = projects.map((p) => ({
      id: `proj-${p._id}`,
      type: "Project",
      title: p.name,
      description: p.description || "Workspace Project",
      path: `/projects/${p._id}`,
    }));

    const taskItems = tasks.map((t) => ({
      id: `task-${t._id}`,
      type: "Task",
      title: t.title,
      description: `Status: ${t.status || "To Do"} ${t.priority ? `| Priority: ${t.priority}` : ""}`,
      path: `/tasks`,
    }));

    return [...staticPages, ...projectItems, ...taskItems];
  }, [projects, tasks]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  const handleSelect = (item) => {
    if (item.path) {
      navigate(item.path);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-16 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:border dark:border-zinc-800 dark:bg-zinc-900"
      >
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <SearchResults results={filteredResults} onSelect={handleSelect} />
      </div>
    </div>
  );
}