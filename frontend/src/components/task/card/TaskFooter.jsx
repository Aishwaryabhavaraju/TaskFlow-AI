import {
  MessageCircle,
  Paperclip,
  Clock3,
} from "lucide-react";

export default function TaskFooter({
  comments = 0,
  attachments = 0,
  hours = 0,
}) {
  return (
    <div className="mt-5 flex items-center justify-between text-zinc-500">

      <div className="flex gap-4">

        <div className="flex items-center gap-1">

          <MessageCircle size={16} />

          {comments}

        </div>

        <div className="flex items-center gap-1">

          <Paperclip size={16} />

          {attachments}

        </div>

        <div className="flex items-center gap-1">

          <Clock3 size={16} />

          {hours}h

        </div>

      </div>

    </div>
  );
}