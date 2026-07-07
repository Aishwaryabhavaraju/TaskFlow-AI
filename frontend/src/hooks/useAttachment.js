import { useDispatch, useSelector } from "react-redux";

import attachmentService from "../services/attachmentService";

import {
  setAttachments,
  addAttachment,
  removeAttachment,
  setLoading,
} from "../redux/slices/attachmentSlice";

export default function useAttachment() {

  const dispatch = useDispatch();

  const state = useSelector(
    state => state.attachments
  );

  const fetchAttachments = async (
    taskId
  ) => {

    dispatch(setLoading(true));

    try {

      const data =
        await attachmentService.getAttachments(
          taskId
        );

      dispatch(
        setAttachments(data.attachments)
      );

    } finally {

      dispatch(setLoading(false));

    }

  };

  const uploadFile = async (
    taskId,
    file
  ) => {

    const data =
      await attachmentService.uploadAttachment(
        taskId,
        file
      );

    dispatch(
      addAttachment(data.attachment)
    );

  };

  const deleteFile = async (
    id
  ) => {

    await attachmentService.deleteAttachment(
      id
    );

    dispatch(removeAttachment(id));

  };

  return {
    ...state,
    fetchAttachments,
    uploadFile,
    deleteFile,
  };

}