const commentService = require("./comment.service");
const notificationService = require("../notification/notification.service");
const Task = require("../../models/Task");
const User = require("../../models/User");

const mentionPattern = /@([a-zA-Z0-9_]+)/g;

const toId = (value) => {
  if (!value) return null;
  return value._id ? value._id.toString() : value.toString();
};

const extractMentionedUsers = async (
  content,
  explicitMentions = []
) => {
  const usernames = [
    ...content.matchAll(mentionPattern),
  ].map((match) => match[1].toLowerCase());

  const users = usernames.length
    ? await User.find({
        username: { $in: usernames },
        isDeleted: false,
      }).select("_id")
    : [];

  return [
    ...new Set([
      ...explicitMentions.map(toId),
      ...users.map((user) => user._id.toString()),
    ].filter(Boolean)),
  ];
};

const getTaskWatchers = (task, actorId, mentionedIds = []) => {
  const excluded = new Set([
    actorId.toString(),
    ...mentionedIds.map((id) => id.toString()),
  ]);

  return [
    ...new Set(
      [
        ...(task.watchers || []),
        ...(task.assignedTo || []),
      ]
        .map(toId)
        .filter((id) => id && !excluded.has(id))
    ),
  ];
};

exports.createComment = async (req, res) => {
  const task = await Task.findById(
    req.body.task
  ).select("title project watchers assignedTo");

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const content = req.body.content || req.body.text || "";

  if (!content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Comment content is required",
    });
  }

  const mentions = await extractMentionedUsers(
    content,
    req.body.mentions || []
  );

  const comment = await commentService.createComment({
    ...req.body,
    content,
    mentions,
    author: req.user._id,
  });

  await notificationService.createNotifications(
    mentions.filter(
      (userId) => userId !== req.user._id.toString()
    ),
    {
      sender: req.user._id,
      type: "MENTION",
      title: "You were mentioned",
      message: `${req.user.firstName} mentioned you in "${task.title}".`,
      task: task._id,
      project: task.project,
    }
  );

  await notificationService.createNotifications(
    getTaskWatchers(task, req.user._id, mentions),
    {
      sender: req.user._id,
      type: "COMMENT",
      title: "New comment",
      message: `${req.user.firstName} commented on "${task.title}".`,
      task: task._id,
      project: task.project,
    }
  );

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: comment,
    comment,
  });
};

exports.getTaskComments = async (req, res) => {
  const comments =
    await commentService.getTaskComments(
      req.params.taskId
    );

  res.status(200).json({
    success: true,
    data: comments,
    comments,
  });
};

exports.updateComment = async (req, res) => {
  const content = req.body.content || req.body.text || "";

  if (!content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Comment content is required",
    });
  }

  const mentions = await extractMentionedUsers(
    content,
    req.body.mentions || []
  );

  const comment =
    await commentService.updateComment(
      req.params.id,
      {
        content,
        mentions,
      }
    );

  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    data: comment,
    comment,
  });
};

exports.deleteComment = async (req, res) => {
  await commentService.deleteComment(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};
