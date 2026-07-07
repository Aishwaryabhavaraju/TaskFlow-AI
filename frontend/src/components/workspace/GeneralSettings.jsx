import SettingsCard from "./SettingsCard";

export default function GeneralSettings() {
    return (
        <SettingsCard title="General">

            <div className="space-y-4">

                <input
                    placeholder="Workspace Name"
                    className="w-full rounded-lg border p-3 dark:bg-zinc-900"
                />

                <textarea
                    rows={4}
                    placeholder="Workspace Description"
                    className="w-full rounded-lg border p-3 dark:bg-zinc-900"
                />

            </div>

        </SettingsCard>
    );
}