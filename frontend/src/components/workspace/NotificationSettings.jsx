import SettingsCard from "./SettingsCard";

export default function NotificationSettings() {
    return (
        <SettingsCard title="Notifications">

            <div className="space-y-4">

                <label className="flex justify-between">

                    <span>Email Notifications</span>

                    <input type="checkbox" defaultChecked />

                </label>

                <label className="flex justify-between">

                    <span>Push Notifications</span>

                    <input type="checkbox" defaultChecked />

                </label>

            </div>

        </SettingsCard>
    );
}