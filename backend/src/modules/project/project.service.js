const Project = require("../../models/Project");
const Board = require("../../models/Board");

const createProject = async (data) => {
  const project = await Project.create(data);

  await Board.create({
    name: `${project.name} Board`,

    description: "Default Kanban Board",

    project: project._id,

    boardType: "kanban",

    isDefault: true,

    columns: [
      {
        name: "To Do",
        color: "#6B7280",
        icon: "ClipboardList",
        order: 1,
      },
      {
        name: "In Progress",
        color: "#3B82F6",
        icon: "Loader",
        order: 2,
      },
      {
        name: "Review",
        color: "#F59E0B",
        icon: "Eye",
        order: 3,
      },
      {
        name: "Done",
        color: "#10B981",
        icon: "CheckCircle",
        order: 4,
      },
    ],
  });

  return project;
};

const getProjects = async (userId) => {
  return await Project.find({
    members: userId,
    isDeleted: false,
  })
    .populate("team", "name")
    .populate(
      "owner",
      "firstName lastName profilePicture"
    )
    .populate(
      "members",
      "firstName lastName profilePicture"
    );
};

const getProjectById = async (id) => {
  return await Project.findById(id)
    .populate("team", "name")
    .populate(
      "owner",
      "firstName lastName profilePicture"
    )
    .populate(
      "members",
      "firstName lastName profilePicture"
    );
};

const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteProject = async (id) => {
  return await Project.findByIdAndUpdate(
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
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};