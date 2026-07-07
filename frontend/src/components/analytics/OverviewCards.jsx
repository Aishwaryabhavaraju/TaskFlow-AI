import OverviewCard from "./OverviewCard";

export default function OverviewCards({
  analytics,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <OverviewCard
        title="Tasks"
        value={analytics.totalTasks}
      />

      <OverviewCard
        title="Completed"
        value={analytics.completedTasks}
      />

      <OverviewCard
        title="Members"
        value={analytics.totalMembers}
      />

      <OverviewCard
        title="Completion"
        value={`${analytics.progress}%`}
      />

    </div>
  );
}