const projectService = require("./project.service");
const notificationService = require("../notification/notification.service");

exports.createProject = async (req, res) => {

  const project = await projectService.createProject({
  ...req.body,
  owner: req.user._id,
});

for (const memberId of project.members) {

  await notificationService.createNotification({

    recipient: memberId,

    sender: req.user._id,

    type: "PROJECT_CREATED",

    title: "New Project",

    message: `${project.name} has been created.`,

    project: project._id,

  });

}

res.status(201).json({
  success: true,
  data: project,
});

};

exports.getProject = async (req, res) => {

  const project =
    await projectService.getProjectById(
      req.params.id
    );

  if (!project) {

    return res.status(404).json({

      success: false,

      message: "Project not found",

    });

  }

  res.status(200).json({

    success: true,

    data: project,

  });

};

exports.updateProject = async (
  req,
  res
) => {

  const project =
    await projectService.updateProject(

      req.params.id,

      req.body

    );

  res.status(200).json({

    success: true,

    message: "Project updated successfully",

    data: project,

  });

};

exports.deleteProject = async (
  req,
  res
) => {

  await projectService.deleteProject(
    req.params.id
  );

  res.status(200).json({

    success: true,

    message: "Project deleted successfully",

  });

};