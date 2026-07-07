import SettingsCard from "./SettingsCard";

export default function PrivacySettings() {
    return (
        <SettingsCard title="Privacy">

            <label className="flex items-center justify-between">

                <span>Private Workspace</span>

                <input type="checkbox" />

            </label>

        </SettingsCard>
    );
}