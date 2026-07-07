import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import SettingsHeader from "../../components/workspace/SettingsHeader";
import GeneralSettings from "../../components/workspace/GeneralSettings";
import BrandingSettings from "../../components/workspace/BrandingSettings";
import PrivacySettings from "../../components/workspace/PrivacySettings";
import NotificationSettings from "../../components/workspace/NotificationSettings";
import AISettings from "../../components/workspace/AISettings";
import UsageStatistics from "../../components/workspace/UsageStatistics";
import ArchiveWorkspace from "../../components/workspace/ArchiveWorkspace";

export default function WorkspaceSettings() {

    const { workspaceId } =
        useParams();

    return (
        <DashboardLayout>

            <SettingsHeader />

            <div className="space-y-6">

                <GeneralSettings />

                <BrandingSettings />

                <PrivacySettings />

                <NotificationSettings />

                <AISettings />

                <UsageStatistics />

                <ArchiveWorkspace
                    workspaceId={workspaceId}
                />

            </div>

        </DashboardLayout>
    );
}