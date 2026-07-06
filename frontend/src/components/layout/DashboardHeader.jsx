import UserMenu from "./UserMenu";

export default function DashboardHeader() {
  return (
    <header
      className="
      h-16
      bg-white
      dark:bg-zinc-900
      border-b
      border-zinc-200
      dark:border-zinc-800

      flex
      items-center
      justify-between

      px-8

      sticky
      top-0

      z-40
      "
    >
      <div>
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>

        <p className="text-sm text-zinc-500">
          Welcome back 👋
        </p>
      </div>

      <UserMenu />
    </header>
  );
}