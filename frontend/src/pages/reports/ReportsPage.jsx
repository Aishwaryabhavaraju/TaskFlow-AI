import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Reports"
        description="Create and review reports for your team, projects, and delivery timelines."
      />

      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Report generation will be available here soon. In the meantime, explore dashboard summaries and analytics.
        </p>
      </div>
    </DashboardLayout>
  );
}
