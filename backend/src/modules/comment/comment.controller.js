const commentService = require("./comment.service");
const notificationService = require("../notification/notification.service");

exports.createComment = async (req, res) => {
  const comment = await commentService.createComment({
    ...req.body,
    author: req.user._id,
  });

  // Create notifications for mentioned users
  if (req.body.mentions && req.body.mentions.length > 0) {
    for (const userId of req.body.mentions) {
      await notificationService.createNotification({
        recipient: userId,
        sender: req.user._id,
        type: "MENTION",
        title: "You were mentioned",
        message: `${req.user.firstName} mentioned you in the task "${task.title}".`,
        task: comment.task,
      });
    }
  }

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: comment,
  });
};

exports.getTaskComments = async (
  req,
  res
) => {
  const comments =
    await commentService.getTaskComments(
      req.params.taskId
    );

  res.status(200).json({
    success: true,
    data: comments,
  });
};

exports.updateComment = async (
  req,
  res
) => {
  const comment =
    await commentService.updateComment(
      req.params.id,
      req.body.content
    );

  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    data: comment,
  });
};

exports.deleteComment = async (
  req,
  res
) => {
  await commentService.deleteComment(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};