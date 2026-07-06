const Attachment = require("../../models/Attachment");

const createAttachment = async (data) => {
  return await Attachment.create(data);
};

const getTaskAttachments = async (taskId) => {
  return await Attachment.find({
    task: taskId,
    isDeleted: false,
  }).populate(
    "uploadedBy",
    "firstName lastName profilePicture"
  );
};

const deleteAttachment = async (id) => {
  return await Attachment.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

module.exports = {
  createAttachment,
  getTaskAttachments,
  deleteAttachment,
};