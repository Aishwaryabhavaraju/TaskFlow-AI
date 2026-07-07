import useAttachment from "../../../hooks/useAttachment";

export default function AttachmentUpload({
  taskId,
}) {

  const { uploadFile } =
    useAttachment();

  const handleChange =
    async e => {

      const file =
        e.target.files[0];

      if (!file) return;

      await uploadFile(
        taskId,
        file
      );

  };

  return (
    <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 p-8 hover:border-blue-500">

      <input
        hidden
        type="file"
        onChange={handleChange}
      />

      Upload Attachment

    </label>
  );
}