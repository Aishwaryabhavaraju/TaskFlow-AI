import { useSelector } from "react-redux";
import {
  FolderKanban,
  CheckSquare,
  Users,
  Clock,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function StatsGrid() {
  const projects = useSelector((state) => state.project.projects || []);
  const tasks = useSelector((state) => state.tasks.tasks || []);
  const members = useSelector((state) => state.projectMembers.members || []);
  const workspaceMembers = useSelector(
    (state) => state.workspace.currentWorkspace?.members || []
  );

  const projectCount = projects.length;
  const taskCount = tasks.length;
  const teamCount = Math.max(members.length, workspaceMembers.length);
  const pendingCount = tasks.filter(
    (task) => task?.status && !/done|completed/i.test(task.status)
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Projects"
        value={projectCount}
        icon={FolderKanban}
        color="bg-blue-500"
      />

      <StatsCard
        title="Tasks"
        value={taskCount}
        icon={CheckSquare}
        color="bg-green-500"
      />

      <StatsCard
        title="Team Members"
        value={teamCount}
        icon={Users}
        color="bg-purple-500"
      />

      <StatsCard
        title="Pending"
        value={pendingCount}
        icon={Clock}
        color="bg-red-500"
      />
    </div>
  );
}