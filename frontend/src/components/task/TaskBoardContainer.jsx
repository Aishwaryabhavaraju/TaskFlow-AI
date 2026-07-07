export default function TaskBoardContainer({
  children,
}) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-950">

      {children}

    </div>
  );
}