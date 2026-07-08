import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

export default function FilesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Files"
        description="Access your workspace files and attachments from one place."
      />

      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          File management features are being built here. Check back soon for uploads, downloads, and shared documents.
        </p>
      </div>
    </DashboardLayout>
  );
}
