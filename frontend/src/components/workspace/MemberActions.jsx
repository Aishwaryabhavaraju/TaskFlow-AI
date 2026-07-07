import { useState } from "react";
import Dropdown from "../ui/dropdown/Dropdown";

import ChangeRoleModal from "./ChangeRoleModal";
import RemoveMemberDialog from "./RemoveMemberDialog";

export default function MemberActions({
  member,
  onRefresh,
}) {
  const [roleOpen, setRoleOpen] =
    useState(false);

  const [removeOpen, setRemoveOpen] =
    useState(false);

  return (
    <>
      <Dropdown
        label="Actions"
        items={[
          {
            label: "Change Role",
            onClick: () =>
              setRoleOpen(true),
          },
          {
            label: "Remove Member",
            onClick: () =>
              setRemoveOpen(true),
          },
        ]}
      />

      <ChangeRoleModal
        open={roleOpen}
        onClose={() =>
          setRoleOpen(false)
        }
        member={member}
        onSuccess={onRefresh}
      />

      <RemoveMemberDialog
        open={removeOpen}
        onClose={() =>
          setRemoveOpen(false)
        }
        member={member}
        onSuccess={onRefresh}
      />
    </>
  );
}