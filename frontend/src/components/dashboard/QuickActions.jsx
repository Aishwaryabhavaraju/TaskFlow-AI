import {
  PlusCircle,
  FolderPlus,
  Bot,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "New Project",
      icon: FolderPlus,
    },
    {
      title: "New Task",
      icon: PlusCircle,
    },
    {
      title: "Ask AI",
      icon: Bot,
    },
  ];

  return (
    <div
      className="
      rounded-2xl
      border
      border-zinc-200
      dark:border-zinc-800
      bg-white
      dark:bg-zinc-900
      p-6
      "
    >
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        {actions.map((action) => (
          <button
            key={action.title}
            className="
            rounded-xl
            border
            border-zinc-200
            dark:border-zinc-700
            p-5
            hover:border-yellow-400
            hover:bg-yellow-50
            dark:hover:bg-zinc-800
            transition
            "
          >
            <action.icon
              className="mx-auto mb-3 text-yellow-500"
              size={28}
            />

            <p>{action.title}</p>
          </button>
        ))}

      </div>
    </div>
  );
}