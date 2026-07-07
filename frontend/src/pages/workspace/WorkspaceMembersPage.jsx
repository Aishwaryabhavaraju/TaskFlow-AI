import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import MembersHeader from "../../components/workspace/MembersHeader";
import MembersGrid from "../../components/workspace/MembersGrid";
import MemberSearch from "../../components/workspace/MemberSearch";
import MemberFilter from "../../components/workspace/MemberFilter";

import useWorkspace from "../../hooks/useWorkspace";

export default function WorkspaceMembersPage() {
  const { workspaceId } = useParams();

  const { fetchMembers } = useWorkspace();

  const [members, setMembers] = useState([]);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      const data =
        await fetchMembers(workspaceId);

      setMembers(data);
    };

    loadMembers();
  }, [workspaceId]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        role === "" || member.role === role;

      return matchesSearch && matchesRole;
    });
  }, [members, search, role]);

  return (
    <DashboardLayout>

      <MembersHeader />

      <div className="mb-6 flex flex-col gap-4 md:flex-row">

        <div className="flex-1">
          <MemberSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        <MemberFilter
          value={role}
          onChange={setRole}
        />

      </div>

      <MembersGrid
        members={filteredMembers}
      />

    </DashboardLayout>
  );
}