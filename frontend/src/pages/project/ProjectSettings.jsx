import DashboardLayout from "../../layouts/DashboardLayout";

import GeneralSettings from "../../components/project/settings/GeneralSettings";
import AppearanceSettings from "../../components/project/settings/AppearanceSettings";
import NotificationSettings from "../../components/project/settings/NotificationSettings";
import PrivacySettings from "../../components/project/settings/PrivacySettings";
import AISettings from "../../components/project/settings/AISettings";
import ExportImportSettings from "../../components/project/settings/ExportImportSettings";
import SaveSettingsButton from "../../components/project/settings/SaveSettingsButton";

export default function ProjectSettings() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-3xl font-bold">
          Project Settings
        </h1>

        <GeneralSettings />

        <AppearanceSettings />

        <NotificationSettings />

        <PrivacySettings />

        <AISettings />

        <ExportImportSettings />

      </div>
    <SaveSettingsButton />
    </DashboardLayout>
  );
}