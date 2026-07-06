import {
  Bot,
  CheckSquare,
  FolderKanban,
  Users,
} from "lucide-react";

const icons = {
  task: CheckSquare,
  project: FolderKanban,
  ai: Bot,
  team: Users,
};

export default function NotificationItem({
  notification,
  onRead,
}) {
  const Icon = icons[notification.type];

  return (
    <button
      onClick={() => onRead(notification.id)}
      className={`
      w-full
      rounded-xl
      p-4
      text-left
      transition

      ${
        notification.read
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
            {notification.time}
          </span>

        </div>

      </div>
    </button>
  );
}