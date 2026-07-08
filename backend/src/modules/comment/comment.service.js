const Comment = require("../../models/Comment");

const createComment = async (data) => {
  return await Comment.create(data);
};

const getTaskComments = async (taskId) => {
  return await Comment.find({
    task: taskId,
    isDeleted: false,
  })
    .populate(
      "author",
      "firstName lastName profilePicture"
    )
    .populate(
      "mentions",
      "firstName lastName username profilePicture"
    )
    .sort({ createdAt: 1 });
};

const updateComment = async (
  id,
  data
) => {
  return await Comment.findByIdAndUpdate(
    id,
    {
      ...data,
      edited: true,
      editedAt: new Date(),
    },
    {
      new: true,
    }
  );
};

const deleteComment = async (id) => {
  return await Comment.findByIdAndUpdate(
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
  createComment,
  getTaskComments,
  updateComment,
  deleteComment,
};
