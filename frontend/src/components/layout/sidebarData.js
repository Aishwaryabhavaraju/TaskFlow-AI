import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  CalendarDays,
  Bot,
  BarChart3,
  FileText,
  FolderOpen,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    title: "My Tasks",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    title: "Teams",
    icon: Users,
    path: "/teams",
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    path: "/calendar",
  },
  {
    title: "AI Assistant",
    icon: Bot,
    path: "/ai",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "Files",
    icon: FolderOpen,
    path: "/files",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];