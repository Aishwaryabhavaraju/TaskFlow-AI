import ProjectColorPicker from "../ProjectColorPicker";
import ProjectCoverUpload from "../ProjectCoverUpload";

export default function AppearanceSettings() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold mb-5">
        Appearance
      </h2>

      <div className="space-y-6">

        <ProjectColorPicker />

        <ProjectCoverUpload />

      </div>

    </div>
  );
}