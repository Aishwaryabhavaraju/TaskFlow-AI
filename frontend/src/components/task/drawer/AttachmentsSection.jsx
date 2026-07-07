import { useEffect } from "react";

import useAttachment from "../../../hooks/useAttachment";

import AttachmentUpload from "../attachments/AttachmentUpload";
import AttachmentList from "../attachments/AttachmentList";

export default function AttachmentsSection({
  taskId,
}) {

  const {
    attachments,
    loading,
    fetchAttachments,
  } = useAttachment();

  useEffect(() => {
    fetchAttachments(taskId);
  }, [taskId]);

  return (
    <div>

      <h3 className="mb-4 text-lg font-semibold">

        Attachments

      </h3>

      <AttachmentUpload
        taskId={taskId}
      />

      <div className="mt-6">

        {loading ? (

          <p>Loading...</p>

        ) : (

          <AttachmentList
            attachments={
              attachments
            }
          />

        )}

      </div>

    </div>
  );
}