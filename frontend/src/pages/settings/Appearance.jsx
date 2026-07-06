import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import ThemeSelector from "../../components/settings/ThemeSelector";

export default function Appearance() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Appearance"
        description="Customize the application's appearance."
      />

      <div
        className="
        max-w-xl
        rounded-2xl
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-900
        p-6
        "
      >
        <h2 className="mb-6 text-xl font-semibold">
          Theme
        </h2>

        <ThemeSelector />
      </div>
    </DashboardLayout>
  );
}