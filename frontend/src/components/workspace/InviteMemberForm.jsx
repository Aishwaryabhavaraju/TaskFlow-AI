import { useState } from "react";

import Button from "../common/Button";
import RoleSelect from "./RoleSelect";

export default function InviteMemberForm({
  onSubmit,
}) {
  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("member");

  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      email,
      role,
    });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <div>

        <label className="mb-2 block">
          Email Address
        </label>

        <input
          required
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3"
        />

      </div>

      <div>

        <label className="mb-2 block">
          Role
        </label>

        <RoleSelect
          value={role}
          onChange={setRole}
        />

      </div>

      <Button className="w-full">
        Send Invitation
      </Button>

    </form>
  );
}