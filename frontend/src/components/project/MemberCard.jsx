import MemberAvatar from "./MemberAvatar";
import OnlineIndicator from "./OnlineIndicator";

export default function MemberCard({
  member,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">

      <div className="flex items-center gap-4">

        <MemberAvatar member={member} />

        <div>

          <h3 className="font-semibold">
            {member.name}
          </h3>

          <p className="text-sm text-zinc-500">
            {member.email}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <OnlineIndicator
          online={member.online}
        />

        <span className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-sm">
          {member.role}
        </span>

      </div>

    </div>
  );
}