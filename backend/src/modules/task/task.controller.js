const taskService = require("./task.service");
const notificationService = require("../notification/notification.service");

const toId = (value) => {
  if (!value) return null;
  return value._id ? value._id.toString() : value.toString();
};

const uniqueRecipients = (task, actorId) => {
  const recipients = [
    ...(task.assignedTo || []),
    ...(task.watchers || []),
  ].map(toId);

  return [
    ...new Set(
      recipients.filter(
        (id) => id && id !== actorId.toString()
      )
    ),
  ];
};

const sendTaskNotifications = async (
  task,
  actorId,
  payload
) => {
  await notificationService.createNotifications(
    uniqueRecipients(task, actorId),
    {
      sender: actorId,
      task: task._id,
      project: task.project,
      ...payload,
    }
  );
};

exports.createTask = async (req, res) => {
  const task = await taskService.createTask({
    ...req.body,
    createdBy: req.user._id,
    watchers: [
      req.user._id,
      ...(req.body.watchers || []),
    ],
  });

  await notificationService.createNotifications(
    req.body.assignedTo || [],
    {
      sender: req.user._id,
      type: "TASK_ASSIGNED",
      title: "New task assigned",
      message: `You have been assigned to "${task.title}".`,
      task: task._id,
      project: task.project,
    }
  );

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
    task,
  });
};

exports.getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(
    req.query.project
  );

  res.status(200).json({
    success: true,
    data: tasks,
    tasks,
  });
};

exports.getTask = async (req, res) => {
  const task = await taskService.getTask(
    req.params.id
  );

  res.status(200).json({
    success: true,
    data: task,
    task,
  });
};

exports.updateTask = async (req, res) => {
  const task = await taskService.updateTask(
    req.params.id,
    req.body
  );

  await sendTaskNotifications(
    task,
    req.user._id,
    {
      type: "TASK_UPDATED",
      title: "Task updated",
      message: `"${task.title}" was updated.`,
    }
  );

  res.status(200).json({
    success: true,
    data: task,
    task,
  });
};

exports.deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

exports.assignMembers = async (req, res) => {
  const task = await taskService.assignMembers(
    req.params.id,
    req.body.members
  );

  await notificationService.createNotifications(
    req.body.members || [],
    {
      sender: req.user._id,
      type: "TASK_ASSIGNED",
      title: "New task assigned",
      message: `You have been assigned to "${task.title}".`,
      task: task._id,
      project: task.project,
    }
  );

  res.status(200).json({
    success: true,
    message: "Members assigned successfully",
    data: task,
    task,
  });
};

exports.updateLabels = async (req, res) => {
  const task = await taskService.updateLabels(
    req.params.id,
    req.body.labels
  );

  await sendTaskNotifications(
    task,
    req.user._id,
    {
      type: "TASK_UPDATED",
      title: "Task labels updated",
      message: `"${task.title}" labels were updated.`,
    }
  );

  res.status(200).json({
    success: true,
    data: task,
    task,
  });
};

exports.updatePriority = async (req, res) => {
  const task = await taskService.updatePriority(
    req.params.id,
    req.body.priority
  );

  await sendTaskNotifications(
    task,
    req.user._id,
    {
      type: "TASK_UPDATED",
      title: "Task priority updated",
      message: `"${task.title}" priority is now ${task.priority}.`,
    }
  );

  res.status(200).json({
    success: true,
    data: task,
    task,
  });
};

exports.updateDueDate = async (req, res) => {
  const task = await taskService.updateDueDate(
    req.params.id,
    req.body.dueDate
  );

  await sendTaskNotifications(
    task,
    req.user._id,
    {
      type: "TASK_DUE",
      title: "Task due date updated",
      message: `"${task.title}" has a new due date.`,
    }
  );

  res.status(200).json({
    success: true,
    data: task,
    task,
  });
};

exports.watchTask = async (req, res) => {
  const task = await taskService.watchTask(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "You are now watching this task",
    data: task,
    task,
  });
};

exports.unwatchTask = async (req, res) => {
  const task = await taskService.unwatchTask(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "You are no longer watching this task",
    data: task,
    task,
  });
};

exports.moveTask = async (req, res) => {
  const task = await taskService.moveTask(
    req.params.id,
    req.body.columnId,
    req.body.status
  );

  await sendTaskNotifications(
    task,
    req.user._id,
    {
      type: "TASK_MOVED",
      title: "Task moved",
      message: `"${task.title}" moved to ${task.status}.`,
    }
  );

  res.status(200).json({
    success: true,
    message: "Task moved successfully",
    data: task,
    task,
  });
};

exports.completeTask = async (req, res) => {
  const task = await taskService.completeTask(
    req.params.id
  );

  await sendTaskNotifications(
    task,
    req.user._id,
    {
      type: "TASK_COMPLETED",
      title: "Task completed",
      message: `"${task.title}" has been marked as completed.`,
    }
  );

  res.status(200).json({
    success: true,
    message: "Task completed",
    data: task,
    task,
  });
};

exports.addChecklistItem = async (req, res) => {
  const task = await taskService.addChecklistItem(
    req.params.id,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Checklist item added successfully",
    data: task,
    task,
  });
};

exports.updateChecklistItem = async (req, res) => {
  const task = await taskService.updateChecklistItem(
    req.params.id,
    req.params.itemId,
    req.body.title
  );

  res.status(200).json({
    success: true,
    message: "Checklist item updated successfully",
    data: task,
    task,
  });
};

exports.toggleChecklistItem = async (req, res) => {
  const task = await taskService.toggleChecklistItem(
    req.params.id,
    req.params.itemId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Checklist item updated successfully",
    data: task,
    task,
  });
};

exports.deleteChecklistItem = async (req, res) => {
  const task = await taskService.deleteChecklistItem(
    req.params.id,
    req.params.itemId
  );

  res.status(200).json({
    success: true,
    message: "Checklist item deleted successfully",
    data: task,
    task,
  });
};
