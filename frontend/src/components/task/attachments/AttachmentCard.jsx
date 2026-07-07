import {
  Download,
  Trash2,
} from "lucide-react";

import useAttachment from "../../../hooks/useAttachment";

export default function AttachmentCard({
  attachment,
}) {

  const { deleteFile } =
    useAttachment();

  return (
    <div className="flex items-center justify-between rounded-xl border p-4">

      <div>

        <h4 className="font-semibold">

          {attachment.originalName}

        </h4>

        <p className="text-sm text-zinc-500">

          {(attachment.size / 1024).toFixed(1)} KB

        </p>

      </div>

      <div className="flex gap-3">

        <a
          href={attachment.url}
          target="_blank"
          rel="noreferrer"
        >
          <Download />
        </a>

        <button
          onClick={() =>
            deleteFile(
              attachment._id
            )
          }
        >
          <Trash2
            className="text-red-500"
          />
        </button>

      </div>

    </div>
  );
}