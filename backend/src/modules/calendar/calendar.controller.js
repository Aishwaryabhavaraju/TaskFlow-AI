const Task = require("../../models/Task");

exports.getEvents = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find all tasks assigned to the user or created by the user
    const tasks = await Task.find({
      $or: [
        { assignedTo: userId },
        { createdBy: userId }
      ],
      isDeleted: false,
    })
      .populate("project", "name")
      .populate("assignedTo", "firstName lastName profilePicture");

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
