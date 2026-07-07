import { useEffect } from "react";

import useComment from "../../../hooks/useComment";

import AddComment from "../comments/AddComment";
import CommentsList from "../comments/CommentsList";

export default function CommentsSection({
  taskId,
}) {

  const {
    comments,
    loading,
    fetchComments,
  } = useComment();

  useEffect(() => {
    fetchComments(taskId);
  }, [taskId]);

  return (
    <div>

      <h3 className="mb-4 text-lg font-semibold">

        Comments

      </h3>

      <AddComment
        taskId={taskId}
      />

      <div className="mt-6">

        {loading ? (

          <p>Loading...</p>

        ) : (

          <CommentsList
            comments={comments}
          />

        )}

      </div>

    </div>
  );
}