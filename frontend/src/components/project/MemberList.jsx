import MemberCard from "./MemberCard";

export default function MemberList({
  members,
}) {
  return (
    <div className="space-y-4">

      {members.map(member => (

        <MemberCard
          key={member._id}
          member={member}
        />

      ))}

    </div>
  );
}