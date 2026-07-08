export default function DashboardContent({
  children,
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="
      flex-1
      overflow-auto
      px-4
      py-6
      sm:px-6
      lg:p-8
      "
    >
      {children}
    </main>
  );
}
