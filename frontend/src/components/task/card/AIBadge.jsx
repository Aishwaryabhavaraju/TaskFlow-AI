import { Sparkles } from "lucide-react";

export default function AIBadge() {
  return (
    <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">

      <Sparkles size={13} />

      AI

    </span>
  );
}