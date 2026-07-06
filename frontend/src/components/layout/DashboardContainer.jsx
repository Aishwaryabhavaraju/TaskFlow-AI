export default function DashboardContainer({ children }) {
  return (
    <div
      className="
      flex
      min-h-screen
      bg-zinc-100
      dark:bg-zinc-950
      transition-colors
      duration-300
      "
    >
      {children}
    </div>
  );
}