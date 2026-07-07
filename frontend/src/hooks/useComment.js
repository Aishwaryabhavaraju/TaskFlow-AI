import { useDispatch, useSelector } from "react-redux";

import commentService from "../services/commentService";

import {
  setComments,
  addComment,
  updateComment,
  deleteComment,
  setLoading,
  setError,
} from "../redux/slices/commentSlice";

export default function useComment() {

  const dispatch = useDispatch();

  const state = useSelector(
    state => state.comments
  );

  const fetchComments = async (taskId) => {

    dispatch(setLoading(true));

    try {

      const data =
        await commentService.getComments(taskId);

      dispatch(setComments(data.comments));

    } catch (error) {

      dispatch(setError(error.message));

    } finally {

      dispatch(setLoading(false));

    }

  };

  const createNewComment = async (
    taskId,
    text
  ) => {

    const data =
      await commentService.createComment(
        taskId,
        text
      );

    dispatch(addComment(data.comment));

  };

  const updateExistingComment = async (
    id,
    text
  ) => {

    const data =
      await commentService.editComment(
        id,
        text
      );

    dispatch(updateComment(data.comment));

  };

  const deleteExistingComment = async (
    id
  ) => {

    await commentService.removeComment(id);

    dispatch(deleteComment(id));

  };

  return {
    ...state,
    fetchComments,
    createNewComment,
    updateExistingComment,
    deleteExistingComment,
  };
}