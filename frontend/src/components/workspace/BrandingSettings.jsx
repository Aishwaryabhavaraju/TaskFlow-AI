import SettingsCard from "./SettingsCard";
import ColorPicker from "./ColorPicker";

export default function BrandingSettings() {
    return (
        <SettingsCard title="Branding">

            <ColorPicker />

            <input
                type="file"
                className="mt-5"
            />

        </SettingsCard>
    );
}