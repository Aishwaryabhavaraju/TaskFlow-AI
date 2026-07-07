import { useState } from "react";

import Button from "../common/Button";
import RoleSelect from "./RoleSelect";

export default function ChangeRoleForm({
  currentRole,
  onSubmit,
}) {
  const [role, setRole] =
    useState(currentRole);

  const submit = (e) => {
    e.preventDefault();

    onSubmit(role);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <RoleSelect
        value={role}
        onChange={setRole}
      />

      <Button className="w-full">
        Update Role
      </Button>
    </form>
  );
}