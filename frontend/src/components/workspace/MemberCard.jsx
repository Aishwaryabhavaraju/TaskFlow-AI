import { User } from "lucide-react";

import RoleBadge from "./RoleBadge";
import MemberActions from "./MemberActions";
import PermissionGuard from "./PermissionGuard";

export default function MemberCard({
  member,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="relative">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-white">
              <User size={24} />
            </div>

            <span
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                member.online
                  ? "bg-green-500"
                  : "bg-zinc-400"
              }`}
            />

          </div>

          <div>

            <h3 className="font-semibold">
              {member.name}
            </h3>

            <p className="text-sm text-zinc-500">
              {member.email}
            </p>

            <div className="mt-2">
              <RoleBadge role={member.role} />
            </div>

          </div>

        </div>

        <PermissionGuard
          role={currentUser.role}
          allowed={["owner", "admin"]}
        >
          <MemberActions
            member={member}
            onRefresh={onRefresh}
          />
        </PermissionGuard>

      </div>

    </div>
  );
}