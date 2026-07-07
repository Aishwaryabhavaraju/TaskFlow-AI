const members = [
  "Alex",
  "Emma",
  "John",
  "Sophia",
];

export default function WorkspaceMembers() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Members
      </h2>

      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member}
            className="flex items-center justify-between rounded-lg bg-zinc-100 dark:bg-zinc-800 px-4 py-3"
          >
            <span>{member}</span>

            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        ))}
      </div>

    </div>
  );
}