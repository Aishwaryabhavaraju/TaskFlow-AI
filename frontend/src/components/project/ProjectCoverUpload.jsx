export default function ProjectCoverUpload({
  onChange,
}) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        onChange(e.target.files[0])
      }
      className="w-full"
    />
  );
}