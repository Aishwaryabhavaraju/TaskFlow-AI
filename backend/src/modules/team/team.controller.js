const Team = require("../../models/Team");
const teamService = require("./team.service");
const notificationService = require("../notification/notification.service");

exports.createTeam = async (req, res) => {
  const team = await teamService.createTeam({
    name: req.body.name,
    description: req.body.description,

    owner: req.user._id,

    members: [
      {
        user: req.user._id,
        role: "owner",
        status: "accepted",
      },
    ],
  });

  res.status(201).json({
    success: true,
    message: "Team created successfully",
    data: team,
  });
};

exports.getMyTeams = async (req, res) => {
  const teams = await teamService.getTeams(req.user._id);

  res.status(200).json({
    success: true,
    data: teams,
  });
};

exports.getTeam = async (req, res) => {
  const team = await teamService.getTeamById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found",
    });
  }

  res.status(200).json({
    success: true,
    data: team,
  });
};

exports.inviteMember = async (req, res) => {

  const invitation =
    await teamService.inviteMember(

      req.params.id,

      req.user._id,

      req.body.email

    );

    await notificationService.createNotification({
      recipient: invitedUser._id,
      sender: req.user._id,
      type: "TEAM_INVITE",
      title: "Team Invitation",
      message: `${req.user.firstName} invited you to join the team.`,
      team: team._id,
    });
  res.status(201).json({
    success: true,
    message: "Invitation sent successfully",
    data: invitation,
  });

};

exports.acceptInvitation =
async (req, res) => {

  const invitation =
    await teamService.acceptInvitation(

      req.params.invitationId,

      req.user._id

    );

  res.status(200).json({

    success: true,

    message: "Joined team",

    data: invitation,

  });

};

exports.rejectInvitation =
async (req, res) => {

  const invitation =
    await teamService.rejectInvitation(

      req.params.invitationId

    );

  res.status(200).json({

    success: true,

    message: "Invitation rejected",

  });

};

exports.leaveTeam = async (
  req,
  res
) => {

  await teamService.leaveTeam(

    req.params.id,

    req.user._id

  );

  res.status(200).json({

    success: true,

    message: "Left team successfully",

  });

};

exports.removeMember =
async (req, res) => {

  await teamService.removeMember(

    req.params.id,

    req.params.memberId

  );

  res.status(200).json({

    success: true,

    message: "Member removed",

  });

};

exports.updateMemberRole =
async (req, res) => {

  await teamService.updateMemberRole(

    req.params.id,

    req.params.memberId,

    req.body.role

  );

  res.status(200).json({

    success: true,

    message: "Role updated",

  });

};

exports.transferOwnership =
async (req, res) => {

  const team =
    await teamService.transferOwnership(

      req.params.id,

      req.body.userId

    );

  res.status(200).json({

    success: true,

    data: team,

  });

};

exports.searchTeams =
async (req, res) => {

  const teams =
    await teamService.searchTeams(
      req.query.search || ""
    );

  res.status(200).json({

    success: true,

    data: teams,

  });

};

exports.uploadTeamLogo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a logo",
    });
  }

  const uploadResult =
    await teamService.uploadTeamLogo(req.file);

    const team = await Team.findByIdAndUpdate(
        req.params.id,
        {
            logo: {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            },
        },
        {
            new: true,
        }
    );

  res.status(200).json({
    success: true,
    message: "Team logo uploaded successfully",
    data: team,
  });
};