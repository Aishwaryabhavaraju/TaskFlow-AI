import toast from "react-hot-toast";

import Button from "../common/Button";
import SettingsCard from "./SettingsCard";

import useWorkspace from "../../hooks/useWorkspace";

export default function ArchiveWorkspace({
    workspaceId
}) {
    const {
        archiveCurrentWorkspace
    } = useWorkspace();

    const archive = async () => {
        await archiveCurrentWorkspace(workspaceId);

        toast.success(
            "Workspace archived successfully."
        );
    };

    return (
        <SettingsCard title="Archive Workspace">

            <p className="mb-5 text-zinc-500">
                Archive this workspace without deleting it.
            </p>

            <Button
                onClick={archive}
                variant="secondary"
            >
                Archive Workspace
            </Button>

        </SettingsCard>
    );
}