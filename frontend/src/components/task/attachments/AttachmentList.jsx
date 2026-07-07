import AttachmentCard from "./AttachmentCard";
import EmptyAttachments from "./EmptyAttachments";

export default function AttachmentList({
  attachments,
}) {

  if (
    attachments.length === 0
  ) {
    return <EmptyAttachments />;
  }

  return (
    <div className="space-y-4">

      {attachments.map(file => (

        <AttachmentCard
          key={file._id}
          attachment={file}
        />

      ))}

    </div>
  );
}