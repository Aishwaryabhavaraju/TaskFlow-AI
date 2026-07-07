import SettingsCard from "./SettingsCard";

export default function AISettings() {
    return (
        <SettingsCard title="AI Preferences">

            <label className="flex justify-between">

                <span>Enable AI Suggestions</span>

                <input type="checkbox" defaultChecked />

            </label>

        </SettingsCard>
    );
}