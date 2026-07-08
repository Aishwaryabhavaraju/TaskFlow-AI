const Task = require("../../models/Task");

const populateTask = (query) =>
  query
    .populate(
      "assignedTo",
      "firstName lastName profilePicture"
    )
    .populate(
      "watchers",
      "firstName lastName profilePicture"
    )
    .populate(
      "createdBy",
      "firstName lastName"
    )
    .populate(
      "attachments",
      "originalName fileUrl fileType fileSize uploadedBy createdAt"
    );

const createTask = async (data) => {
  const task = await Task.create(data);
  return await populateTask(Task.findById(task._id));
};

const getTasks = async (projectId) => {
  return await populateTask(
    Task.find({
      project: projectId,
      isDeleted: false,
    })
  );
};

const getTask = async (id) => {
  return await populateTask(Task.findById(id));
};

const updateTask = async (id, data) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    )
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

const assignMembers = async (taskId, members) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: members,
        $addToSet: {
          watchers: { $each: members || [] },
        },
      },
      {
        new: true,
      }
    )
  );
};

const updateLabels = async (taskId, labels) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      {
        labels,
      },
      {
        new: true,
      }
    )
  );
};

const updatePriority = async (taskId, priority) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      {
        priority,
      },
      {
        new: true,
      }
    )
  );
};

const updateDueDate = async (taskId, dueDate) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      {
        dueDate,
      },
      {
        new: true,
      }
    )
  );
};

const watchTask = async (taskId, userId) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      {
        $addToSet: {
          watchers: userId,
        },
      },
      {
        new: true,
      }
    )
  );
};

const unwatchTask = async (taskId, userId) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      {
        $pull: {
          watchers: userId,
        },
      },
      {
        new: true,
      }
    )
  );
};

const moveTask = async (taskId, columnId, status) => {
  const update = { status };

  if (columnId) {
    update.columnId = columnId;
  }

  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      update,
      {
        new: true,
      }
    )
  );
};

const completeTask = async (taskId) => {
  return await populateTask(
    Task.findByIdAndUpdate(
      taskId,
      {
        status: "Done",
        completedAt: new Date(),
      },
      {
        new: true,
      }
    )
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
  watchTask,
  unwatchTask,
  moveTask,
  completeTask,
  addChecklistItem,
  updateChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
};
