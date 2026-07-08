import { Loader2 } from "lucide-react";

import Skeleton from "../ui/skeleton/Skeleton";

export default function AppLoader({
  label = "Loading TaskFlow AI",
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-100 p-6 text-zinc-900 dark:bg-zinc-950 dark:text-white"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 text-black">
            <Loader2 className="animate-spin" size={20} />
          </span>

          <div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-zinc-500">
              Preparing your workspace.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-8/12" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
