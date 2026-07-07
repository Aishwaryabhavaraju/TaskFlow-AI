export default function WorkloadDistribution({
  analytics,
}) {
  const workload = analytics.workload || [];
  const max = Math.max(
    1,
    ...workload.map((member) => member.assigned)
  );

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-5 text-lg font-semibold">
        Workload Distribution
      </h2>

      <div className="space-y-4">
        {workload.map((member) => (
          <div key={member.memberId || member.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{member.name}</span>
              <span>
                {member.active} active /{" "}
                {member.completed} done
              </span>
            </div>
            <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-2 rounded-full bg-violet-500"
                style={{
                  width: `${
                    (member.assigned / max) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
