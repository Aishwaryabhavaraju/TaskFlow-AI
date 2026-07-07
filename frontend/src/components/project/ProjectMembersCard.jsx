import { User } from "lucide-react";

export default function ProjectMembersCard({
  members = [],
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Members
      </h2>

      {members.map((member) => (
        <div
          key={member._id}
          className="mb-4 flex items-center gap-3"
        >
          <User size={20} />

          <div>

            <p>{member.name}</p>

            <p className="text-sm text-zinc-500">
              {member.role}
            </p>

          </div>

        </div>
      ))}

    </div>
  );
}