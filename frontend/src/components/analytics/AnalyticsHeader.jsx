import ExportReportButton from "./ExportReportButton";

export default function AnalyticsHeader({
  analytics,
  onExport,
  exporting,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>
        <p className="text-zinc-500">
          {analytics?.project?.name ||
            "Monitor project and team performance."}
        </p>
      </div>

      <ExportReportButton
        onExport={onExport}
        loading={exporting}
      />
    </div>
  );
}
