export default function DashboardContent({
  children,
}) {
  return (
    <main
      className="
      flex-1
      overflow-auto
      p-8
      "
    >
      {children}
    </main>
  );
}