export default function TimelineContainer({
  children,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white p-6 shadow dark:border-zinc-700 dark:bg-zinc-900">

      {children}

    </div>
  );
}