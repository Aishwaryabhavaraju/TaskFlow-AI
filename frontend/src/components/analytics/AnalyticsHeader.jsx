import ExportReportButton from "./ExportReportButton";

export default function AnalyticsHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          Project Analytics
        </h1>

        <p className="text-zinc-500">
          Monitor your project performance.
        </p>

      </div>

      <ExportReportButton />

    </div>
  );
}