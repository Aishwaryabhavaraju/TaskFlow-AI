import { useEffect, useMemo, useState } from "react";

import MemberSearch from "./MemberSearch";
import MemberList from "./MemberList";

import useProjectMembers from "../../hooks/useProjectMembers";

export default function MembersManagement({
  projectId,
}) {

  const {
    members,
    fetchMembers,
  } = useProjectMembers();

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchMembers(projectId);

  }, [projectId]);

  const filtered =
    useMemo(() => {

      return members.filter(member =>
        member.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }, [members, search]);

  return (
    <div className="space-y-6">

      <MemberSearch
        value={search}
        onChange={setSearch}
      />

      <MemberList
        members={filtered}
      />

    </div>
  );
}