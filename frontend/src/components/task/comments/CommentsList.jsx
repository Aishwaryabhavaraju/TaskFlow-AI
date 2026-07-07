import CommentItem from "./CommentItem";
import EmptyComments from "./EmptyComments";

export default function CommentsList({
  comments,
}) {

  if (comments.length === 0) {
    return <EmptyComments />;
  }

  return (
    <div className="space-y-4">

      {comments.map(comment => (

        <CommentItem
          key={comment._id}
          comment={comment}
        />

      ))}

    </div>
  );
}