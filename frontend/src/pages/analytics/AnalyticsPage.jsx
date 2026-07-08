import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Analytics"
        description="Review workspace performance and insights from the analytics center."
      />

      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Analytics content is loading. Use project analytics for deeper insights into any specific project.
        </p>
      </div>
    </DashboardLayout>
  );
}
