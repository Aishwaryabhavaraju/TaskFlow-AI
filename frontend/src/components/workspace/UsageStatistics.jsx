import SettingsCard from "./SettingsCard";

export default function UsageStatistics() {
    return (
        <SettingsCard title="Workspace Usage">

            <div className="space-y-3">

                <p>Projects : 12</p>

                <p>Members : 18</p>

                <p>Storage Used : 2.4 GB</p>

                <p>Tasks : 248</p>

            </div>

        </SettingsCard>
    );
}