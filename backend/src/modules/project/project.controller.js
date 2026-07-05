const projectService = require("./project.service");

exports.createProject = async (req, res) => {

  const project =
    await projectService.createProject({

      ...req.body,

      owner: req.user._id,

      members: [req.user._id],

    });

  res.status(201).json({

    success: true,

    message: "Project created successfully",

    data: project,

  });

};

exports.getProjects = async (req, res) => {

  const projects =
    await projectService.getProjects(
      req.user._id
    );

  res.status(200).json({

    success: true,

    data: projects,

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