import Skeleton from "./Skeleton";

export default function ListSkeleton({
  items = 5,
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
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="mb-5 flex items-center gap-4"
        >
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="flex-1">

            <Skeleton className="mb-2 h-4 w-52" />

            <Skeleton className="h-3 w-32" />

          </div>

        </div>
      ))}
    </div>
  );
}