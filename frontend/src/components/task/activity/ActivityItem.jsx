import { formatDistanceToNow } from "date-fns";

export default function ActivityItem({
  activity,
}) {

  return (
    <div className="flex gap-4">

      <div className="mt-2 h-3 w-3 rounded-full bg-blue-500"></div>

      <div className="flex-1 border-l pl-5 pb-6">

        <h4 className="font-medium">

          {activity.user.firstName} {activity.user.lastName}

        </h4>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">

          {activity.message}

        </p>

        <span className="text-xs text-zinc-500">

          {formatDistanceToNow(
            new Date(activity.createdAt),
            { addSuffix: true }
          )}

        </span>

      </div>

    </div>
  );

}