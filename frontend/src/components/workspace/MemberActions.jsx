import Dropdown from "../ui/dropdown/Dropdown";

export default function MemberActions() {
  return (
    <Dropdown
      label="Actions"
      items={[
        {
          label: "Change Role",
          onClick: () => {},
        },
        {
          label: "Remove Member",
          onClick: () => {},
        },
      ]}
    />
  );
}