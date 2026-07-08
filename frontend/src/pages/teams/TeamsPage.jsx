import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

export default function TeamsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Teams"
        description="Manage your team memberships and collaborations."
      />

      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your team dashboard is coming soon. Explore teams, invite members, and review team activity from this page.
        </p>
      </div>
    </DashboardLayout>
  );
}
