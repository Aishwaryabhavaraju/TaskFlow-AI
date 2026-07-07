import MemberCard from "./MemberCard";

export default function MembersGrid({
  members,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <MemberCard
          key={member._id}
          member={member}
        />
      ))}
    </div>
  );
}