import {
  FolderKanban,
  CheckSquare,
  Users,
  Clock,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Projects"
        value="12"
        icon={FolderKanban}
        color="bg-blue-500"
      />

      <StatsCard
        title="Tasks"
        value="86"
        icon={CheckSquare}
        color="bg-green-500"
      />

      <StatsCard
        title="Team Members"
        value="18"
        icon={Users}
        color="bg-purple-500"
      />

      <StatsCard
        title="Pending"
        value="9"
        icon={Clock}
        color="bg-red-500"
      />

    </div>
  );
}