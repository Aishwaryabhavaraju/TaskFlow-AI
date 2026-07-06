import Skeleton from "./Skeleton";

export default function CardSkeleton() {
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
      <Skeleton className="mb-4 h-6 w-40" />

      <Skeleton className="mb-3 h-4 w-full" />

      <Skeleton className="mb-3 h-4 w-3/4" />

      <Skeleton className="h-10 w-28" />
    </div>
  );
}