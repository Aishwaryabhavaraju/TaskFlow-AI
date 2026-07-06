import Skeleton from "./Skeleton";

export default function TableSkeleton({
  rows = 6,
}) {
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
      <Skeleton className="mb-6 h-8 w-52" />

      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="mb-4 flex gap-4"
        >
          <Skeleton className="h-10 flex-1" />

          <Skeleton className="h-10 w-32" />

          <Skeleton className="h-10 w-24" />
        </div>
      ))}
    </div>
  );
}