import Button from "../../common/Button";

export default function ExportImportSettings() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold mb-5">
        Export / Import
      </h2>

      <div className="flex gap-4">

        <Button>

          Export Project

        </Button>

        <Button
          variant="secondary"
        >

          Import Project

        </Button>

      </div>

    </div>
  );
}