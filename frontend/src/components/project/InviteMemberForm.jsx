import { useState } from "react";

import Button from "../common/Button";

export default function InviteMemberForm({
  onSubmit,
}) {

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("Member");

  const submit = e => {

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

      <input
        type="email"
        required
        placeholder="Member Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <select
        value={role}
        onChange={(e)=>
          setRole(e.target.value)
        }
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      >
        <option>Viewer</option>
        <option>Member</option>
        <option>Admin</option>
      </select>

      <Button className="w-full">
        Send Invite
      </Button>

    </form>
  );
}