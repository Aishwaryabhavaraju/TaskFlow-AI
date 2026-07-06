export default function ProgressBar({
  value,
}) {
  return (
    <div className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-700">

      <div
        className="h-full rounded-full bg-yellow-500 transition-all duration-500"
        style={{
          width: `${value}%`,
        }}
      />

    </div>
  );
}