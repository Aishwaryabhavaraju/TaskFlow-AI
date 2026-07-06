export default function Tooltip({
  text,
  children,
}) {
  return (
    <div className="group relative inline-block">

      {children}

      <div
        className="
        invisible
        absolute
        bottom-full
        left-1/2
        mb-2
        -translate-x-1/2
        rounded-lg
        bg-zinc-900
        px-3
        py-2
        text-xs
        text-white
        opacity-0
        transition
        group-hover:visible
        group-hover:opacity-100
        "
      >
        {text}
      </div>

    </div>
  );
}