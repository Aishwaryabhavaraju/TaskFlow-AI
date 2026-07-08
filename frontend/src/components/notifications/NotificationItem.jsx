import {
  Bot,
  CheckSquare,
  MessageCircle,
  FolderKanban,
  AtSign,
  Bell,
  Users,
} from "lucide-react";

const icons = {
  TASK_ASSIGNED: CheckSquare,
  TASK_UPDATED: CheckSquare,
  TASK_COMPLETED: CheckSquare,
  TASK_MOVED: CheckSquare,
  TASK_DUE: CheckSquare,
  COMMENT: MessageCircle,
  MENTION: AtSign,
  PROJECT_CREATED: FolderKanban,
  TEAM_INVITE: Users,
  DAILY_DIGEST: Bot,
  SYSTEM: Bell,
};

export default function NotificationItem({
  notification,
  onRead,
}) {
  const Icon = icons[notification.type] || Bell;
  const createdAt = notification.createdAt
    ? new Date(notification.createdAt)
    : null;

  return (
    <button
      onClick={() =>
        !notification.isRead &&
        onRead(notification._id)
      }
      className={`
      w-full
      rounded-xl
      p-4
      text-left
      transition

      ${
        notification.isRead
          ? "bg-transparent"
          : "bg-yellow-50 dark:bg-yellow-900/20"
      }

      hover:bg-zinc-100
      dark:hover:bg-zinc-800
      `}
    >
      <div className="flex gap-4">

        <div className="rounded-lg bg-yellow-500 p-3 text-white">
          <Icon size={18} />
        </div>

        <div className="flex-1">

          <h3 className="font-semibold">
            {notification.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {notification.message}
          </p>

          <span className="mt-2 block text-xs text-zinc-400">
            {createdAt
              ? createdAt.toLocaleString()
              : ""}
          </span>

        </div>

      </div>
    </button>
  );
}
