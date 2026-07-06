export default function SidebarSection({
  title,
  children,
  collapsed,
}) {
  return (
    <div className="mb-6">

      {!collapsed && (
        <h3
          className="
          mb-2
          px-4
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-zinc-400
          "
        >
          {title}
        </h3>
      )}

      <div className="space-y-2">
        {children}
      </div>

    </div>
  );
}