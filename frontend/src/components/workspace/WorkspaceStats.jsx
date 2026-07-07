import WorkspaceStatCard from "./WorkspaceStatCard";

export default function WorkspaceStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <WorkspaceStatCard
        title="Projects"
        value="12"
        color="#F59E0B"
      />

      <WorkspaceStatCard
        title="Members"
        value="18"
        color="#3B82F6"
      />

      <WorkspaceStatCard
        title="Tasks"
        value="248"
        color="#10B981"
      />

      <WorkspaceStatCard
        title="Completed"
        value="182"
        color="#EF4444"
      />

    </div>
  );
}