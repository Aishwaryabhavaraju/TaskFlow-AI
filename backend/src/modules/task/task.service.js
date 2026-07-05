const Task = require("../../models/Task");
const { move } = require("./task.routes");

const createTask = async (data) => {
  return await Task.create(data);
};

const getTasks = async (projectId) => {
  return await Task.find({
    project: projectId,
    isDeleted: false,
  })
    .populate(
      "assignedTo",
      "firstName lastName profilePicture"
    )
    .populate(
      "createdBy",
      "firstName lastName"
    );
};

const getTask = async (id) => {
  return await Task.findById(id)
    .populate(
      "assignedTo",
      "firstName lastName profilePicture"
    )
    .populate(
      "createdBy",
      "firstName lastName"
    );
};

const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteTask = async (id) => {
  return await Task.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

const assignMembers = async (
  taskId,
  members
) => {

  return await Task.findByIdAndUpdate(
    taskId,
    {
      assignedTo: members,
    },
    {
      new: true,
    }
  )
  .populate(
    "assignedTo",
    "firstName lastName profilePicture"
  );

};

const updateLabels = async (
  taskId,
  labels
) => {

  return await Task.findByIdAndUpdate(

    taskId,

    {
      labels,
    },

    {
      new: true,
    }

  );

};

const updatePriority = async (
  taskId,
  priority
) => {

  return await Task.findByIdAndUpdate(

    taskId,

    {
      priority,
    },

    {
      new: true,
    }

  );

};

const updateDueDate = async (
  taskId,
  dueDate
) => {

  return await Task.findByIdAndUpdate(

    taskId,

    {
      dueDate,
    },

    {
      new: true,
    }

  );

};

const moveTask = async (
  taskId,
  columnId,
  status
) => {

  return await Task.findByIdAndUpdate(

    taskId,

    {

      columnId,

      status,

    },

    {
      new: true,
    }

  );

};

const completeTask = async (
  taskId
) => {

  return await Task.findByIdAndUpdate(

    taskId,

    {

      status: "Done",

      completedAt: new Date(),

    },

    {
      new: true,
    }

  );

};

const addChecklistItem = async (taskId, item) => {
  return await Task.findByIdAndUpdate(
    taskId,
    {
      $push: {
        checklist: item,
      },
    },
    {
      new: true,
    }
  );
};

const updateChecklistItem = async (
  taskId,
  itemId,
  title
) => {
  const task = await Task.findById(taskId);

  const item = task.checklist.id(itemId);

  item.title = title;

  await task.save();

  return task;
};

const toggleChecklistItem = async (
  taskId,
  itemId,
  userId
) => {
  const task = await Task.findById(taskId);

  const item = task.checklist.id(itemId);

  item.completed = !item.completed;

  if (item.completed) {
    item.completedBy = userId;
    item.completedAt = new Date();
  } else {
    item.completedBy = null;
    item.completedAt = null;
  }

  await task.save();

  return task;
};

const deleteChecklistItem = async (
  taskId,
  itemId
) => {
  const task = await Task.findById(taskId);

  task.checklist.pull(itemId);

  await task.save();

  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignMembers,
  updateLabels,
  updatePriority,
  updateDueDate,
  moveTask,
  completeTask,
  addChecklistItem,
  updateChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
};