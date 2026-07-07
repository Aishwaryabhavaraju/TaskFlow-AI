import { useState } from "react";
import Button from "../../common/Button";
import useComment from "../../../hooks/useComment";

export default function AddComment({
  taskId,
}) {

  const [text, setText] =
    useState("");

  const {
    createNewComment,
  } = useComment();

  const submit = async e => {

    e.preventDefault();

    if (!text.trim()) return;

    await createNewComment(
      taskId,
      text
    );

    setText("");

  };

  return (
    <form
      onSubmit={submit}
      className="space-y-3"
    >

      <textarea
        rows={3}
        value={text}
        onChange={(e)=>
          setText(e.target.value)
        }
        placeholder="Write a comment..."
        className="w-full rounded-xl border p-3 dark:bg-zinc-900"
      />

      <Button type="submit">

        Comment

      </Button>

    </form>
  );
}