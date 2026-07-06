import { useLocation } from "react-router-dom";

const titles = {
  dashboard: "Dashboard",
  projects: "Projects",
  tasks: "My Tasks",
  teams: "Teams",
  calendar: "Calendar",
  analytics: "Analytics",
  reports: "Reports",
  files: "Files",
  settings: "Settings",
  ai: "AI Assistant",
};

export default function useBreadcrumbs() {
  const location = useLocation();

  const paths = location.pathname
    .split("/")
    .filter(Boolean);

  const breadcrumbs = paths.map((path, index) => ({
    title:
      titles[path] ||
      path.replace("-", " "),
    path:
      "/" + paths.slice(0, index + 1).join("/"),
  }));

  return breadcrumbs;
}