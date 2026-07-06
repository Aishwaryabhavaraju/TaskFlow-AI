const taskService = require("./task.service");
const notificationService = require("../notification/notification.service");

exports.createTask = async (req, res) => {

  const task =
    await taskService.createTask({

      ...req.body,

      createdBy: req.user._id,

    });

  res.status(201).json({

    success: true,

    message: "Task created successfully",

    data: task,

  });

};

exports.getTasks = async (req, res) => {

  const tasks =
    await taskService.getTasks(
      req.query.project
    );

  res.status(200).json({

    success: true,

    data: tasks,

  });

};

exports.getTask = async (req, res) => {

  const task =
    await taskService.getTask(
      req.params.id
    );

  res.status(200).json({

    success: true,

    data: task,

  });

};

exports.updateTask = async (req, res) => {

  const task =
    await taskService.updateTask(

      req.params.id,

      req.body

    );

  res.status(200).json({

    success: true,

    data: task,

  });

};

exports.deleteTask = async (req, res) => {

  await taskService.deleteTask(
    req.params.id
  );

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

  // Create a notification for each assigned member
  for (const memberId of req.body.members) {
    await notificationService.createNotification({
      recipient: memberId,
      sender: req.user._id,
      type: "TASK_ASSIGNED",
      title: "New Task Assigned",
      message: `You have been assigned to "${task.title}".`,
      task: task._id,
      project: task.project,
    });
  }

  res.status(200).json({
    success: true,
    message: "Members assigned successfully",
    data: task,
  });
};

exports.updateLabels =
async (req, res) => {

  const task =
    await taskService.updateLabels(

      req.params.id,

      req.body.labels

    );

  res.status(200).json({

    success: true,

    data: task,

  });

};

exports.updatePriority =
async (req, res) => {

  const task =
    await taskService.updatePriority(

      req.params.id,

      req.body.priority

    );

  res.status(200).json({

    success: true,

    data: task,

  });

};

exports.updateDueDate =
async (req, res) => {

  const task =
    await taskService.updateDueDate(

      req.params.id,

      req.body.dueDate

    );

  res.status(200).json({

    success: true,

    data: task,

  });

};

exports.moveTask = async (req, res) => {

  const task = await taskService.moveTask(
    req.params.id,
    req.body.columnId,
    req.body.status
  );

  for (const memberId of task.assignedTo) {
    await notificationService.createNotification({
      recipient: memberId,
      sender: req.user._id,
      type: "TASK_MOVED",
      title: "Task Updated",
      message: `"${task.title}" moved to ${task.status}.`,
      task: task._id,
      project: task.project,
    });
  }

  res.status(200).json({
    success: true,
    message: "Task moved successfully",
    data: task,
  });

};

exports.completeTask = async (req, res) => {

  const task = await taskService.completeTask(req.params.id);

  for (const memberId of task.assignedTo) {
    await notificationService.createNotification({
      recipient: memberId,
      sender: req.user._id,
      type: "TASK_COMPLETED",
      title: "Task Completed",
      message: `"${task.title}" has been marked as completed.`,
      task: task._id,
      project: task.project,
    });
  }

  res.status(200).json({
    success: true,
    message: "Task completed",
    data: task,
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
  });
};