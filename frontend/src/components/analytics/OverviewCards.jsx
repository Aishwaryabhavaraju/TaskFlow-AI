import OverviewCard from "./OverviewCard";

export default function OverviewCards({ analytics }) {
  const { overview } = analytics;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        title="Total Tasks"
        value={overview.totalTasks}
      />
      <OverviewCard
        title="Completed"
        value={overview.completedTasks}
      />
      <OverviewCard
        title="Team Members"
        value={overview.totalMembers}
      />
      <OverviewCard
        title="Health Score"
        value={`${overview.healthScore}/100`}
      />
    </div>
  );
}
