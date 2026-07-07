import { Download } from "lucide-react";

const FORMATS = [
  ["csv", "CSV"],
  ["excel", "Excel"],
  ["pdf", "PDF"],
];

export default function ExportReportButton({
  onExport,
  loading,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {FORMATS.map(([format, label]) => (
        <button
          key={format}
          type="button"
          disabled={loading}
          onClick={() => onExport(format)}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Download size={16} />
          {label}
        </button>
      ))}
    </div>
  );
}
