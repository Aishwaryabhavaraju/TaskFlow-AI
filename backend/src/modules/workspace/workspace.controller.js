const Workspace = require("../../models/Workspace");

exports.getWorkspaces = async (req, res, next) => {
  try {
    const userId = req.user._id;

    let workspaces = await Workspace.find({
      $or: [{ owner: userId }, { "members.user": userId }],
      isArchived: false,
    })
      .populate("owner", "firstName lastName email jobTitle")
      .populate("members.user", "firstName lastName email jobTitle");

    if (!workspaces.length) {
      const defaultWorkspace = await Workspace.create({
        name: "My Workspace",
        slug: "my-workspace",
        description: "Primary workspace for project planning and team collaboration.",
        owner: userId,
        members: [{ user: userId, role: "Owner" }],
        defaultRole: "Member",
        visibility: "Private",
      });

      workspaces = [
        await Workspace.findById(defaultWorkspace._id)
          .populate("owner", "firstName lastName email jobTitle")
          .populate("members.user", "firstName lastName email jobTitle"),
      ];
    }

    res.status(200).json({
      success: true,
      data: workspaces,
    });
  } catch (error) {
    next(error);
  }
};

exports.getWorkspaceById = async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate("owner", "firstName lastName email jobTitle")
      .populate("members.user", "firstName lastName email jobTitle");

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
};

exports.createWorkspace = async (req, res, next) => {
  try {
    const { name, slug, description, defaultRole, visibility, color } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    const workspaceName = name.trim();

    const workspace = await Workspace.create({
      name: workspaceName,
      slug: slug || workspaceName.toLowerCase().replace(/\s+/g, "-"),
      description: description ? description.trim() : "",
      defaultRole: defaultRole || "Member",
      visibility: visibility || "Private",
      owner: req.user._id,
      members: [{ user: req.user._id, role: "Owner" }],
      settings: color ? { color } : {},
    });

    const populated = await Workspace.findById(workspace._id)
      .populate("owner", "firstName lastName email jobTitle")
      .populate("members.user", "firstName lastName email jobTitle");

    res.status(201).json({
      success: true,
      data: populated,
      workspace: populated,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateWorkspace = async (req, res, next) => {
  try {
    const { name, slug, description, defaultRole, visibility } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (defaultRole !== undefined) updateData.defaultRole = defaultRole;
    if (visibility !== undefined) updateData.visibility = visibility;

    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("owner", "firstName lastName email jobTitle")
      .populate("members.user", "firstName lastName email jobTitle");

    res.status(200).json({
      success: true,
      data: { workspace },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteWorkspace = async (req, res, next) => {
  try {
    await Workspace.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: null,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getWorkspaceSettings = async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        settings: {
          name: workspace.name,
          slug: workspace.slug,
          defaultRole: workspace.defaultRole,
          visibility: workspace.visibility,
          ...workspace.settings,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateWorkspaceSettings = async (req, res, next) => {
  try {
    const { workspace: workspaceData, settings, profile, project } = req.body;

    const updateData = {};

    if (workspaceData) {
      if (workspaceData.name) updateData.name = workspaceData.name;
      if (workspaceData.slug) updateData.slug = workspaceData.slug;
      if (workspaceData.defaultRole) updateData.defaultRole = workspaceData.defaultRole;
      if (workspaceData.visibility) updateData.visibility = workspaceData.visibility;
    }

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.slug) updateData.slug = req.body.slug;
    if (req.body.defaultRole) updateData.defaultRole = req.body.defaultRole;
    if (req.body.visibility) updateData.visibility = req.body.visibility;

    if (settings || profile || project) {
      updateData.settings = {
        ...(settings || {}),
        profile: profile || {},
        project: project || {},
      };
    }

    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("owner", "firstName lastName email jobTitle")
      .populate("members.user", "firstName lastName email jobTitle");

    res.status(200).json({
      success: true,
      data: updatedWorkspace,
      workspace: updatedWorkspace,
      settings: {
        name: updatedWorkspace.name,
        slug: updatedWorkspace.slug,
        defaultRole: updatedWorkspace.defaultRole,
        visibility: updatedWorkspace.visibility,
        ...updatedWorkspace.settings,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getWorkspaceMembers = async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.id).populate(
      "members.user",
      "firstName lastName email jobTitle profilePicture"
    );

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        members: workspace.members,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.inviteMember = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    res.status(200).json({
      success: true,
      data: {
        email,
        role: role || "Member",
        status: "Pending",
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMemberRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    res.status(200).json({
      success: true,
      data: {
        member: { id: req.params.memberId, role },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: null,
      message: "Member removed",
    });
  } catch (error) {
    next(error);
  }
};

exports.archiveWorkspace = async (req, res, next) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
};
