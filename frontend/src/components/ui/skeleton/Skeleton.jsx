export default function Skeleton({
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        animate-pulse
        rounded-lg
        bg-zinc-200
        dark:bg-zinc-700
        ${className}
      `}
    />
  );
}
