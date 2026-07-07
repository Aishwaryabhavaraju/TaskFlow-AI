import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function CommentItem({
  comment,
}) {
  return (
    <div className="rounded-xl border p-4 dark:border-zinc-700">

      <div className="flex items-center justify-between">

        <h4 className="font-semibold">

          {comment.user.firstName} {comment.user.lastName}

        </h4>

        <span className="text-sm text-zinc-500">

          {dayjs(comment.createdAt).fromNow()}

        </span>

      </div>

      <p className="mt-3">

        {comment.text}

      </p>

    </div>
  );
}