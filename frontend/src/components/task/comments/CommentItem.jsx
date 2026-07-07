import { formatDistanceToNow } from "date-fns";

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

          {formatDistanceToNow(
            new Date(comment.createdAt),
            {
              addSuffix: true,
            }
          )}

        </span>

      </div>

      <p className="mt-3">

        {comment.text}

      </p>

    </div>
  );
}